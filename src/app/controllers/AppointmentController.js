import Appointment from '../models/Appointment';
import Notification from '../schemas/Notifications';
import { startOfHour, parseISO, isBefore, format, subHours} from 'date-fns';
import pt from 'date-fns/locale/pt';
import User from '../models/User';
import File from '../models/File';
import * as Yup from 'yup';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
    //Listar Agendamento
    async index( req,res ){
        const { page = 1 } = req.query;

        const appointments = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null},
            order: ['date'],
            limit: 20,
            offset: (page - 1)* 20,
            attributes: ['id', 'date', 'past', 'cancelable'],
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include:[
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id','path','url'],
                        }
                    ] 
                }
            ]
        });

        res.json(appointments);
    }

    //Criar Agendamento
    async store(req,res){
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails'})
        }


        const { provider_id, date} = req.body;

        //chesk if provider_id is a provider
        const isProvider = await User.findOne({
            where: { id: provider_id, provider: true},
        });
        if(!isProvider){
            return res.status(401).json({ error: 'You can only create appointments with providers'})
        }

        //check appointement Provider is Provider*****
        const checkProviderwithProvider =  (provider_id===req.userId)   
        if(checkProviderwithProvider){
            return res.status(401).json({ error: 'You can only create appointments providers with providers'})
        }

        //check date is invalid por estar no passado
        const hourStart = startOfHour(parseISO(date));
        if(isBefore(hourStart, new Date())){
            return res.status(400).json({ error: 'Past dates are not permitted'})
        }

        //check date availability
        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            }
        });
        if(checkAvailability){
            return res.status(400).json({ error: 'Appointment date is noit available'})
        }


        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date: hourStart,
        })

        //Notify appointment provider
        const user = await User.findByPk(req.userId);
        const formatttedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', às ' H:mm'h' ",
            {locale: pt}
        );
        await Notification.create({
            content: `Novo agendamento de ${user.name} para ${formatttedDate}`,
            user: provider_id,
        })

        return res.json(appointment);
    }

    //Deleta agendamento
    async delete(req, res){
        const appointment = await Appointment.findByPk(req.params.id, {
            include: [//buscando o email do provider para seu envio  
                {
                    model: User,
                    as: 'provider',
                    attributes: ['name', 'email'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'email'],
                }
            ]
        });

        if(appointment.user_id != req.userId){
            return res.status(401).json({ error: "You don't have permission to cancel this appointment"})
        }

        //utilizando o subHours para reduzir e limitar em duas horas antes do cancelamento
        const datewithSub = subHours(appointment.date, 2);
        if(isBefore(datewithSub, new Date())){
            return res.status(401).json({ error: 'You can only cancel appointment 2 hours in advance'})
        }

        //atualizando status do agendamento
        appointment.canceled_at = new Date();
        await appointment.save();

        await Queue.add(CancellationMail.key, {
            appointment,
        })

        return res.json(appointment);
    }

}

export default new AppointmentController();