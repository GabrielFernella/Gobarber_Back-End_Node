import User from '../models/User';
import Notifications from '../schemas/Notifications';

class NotificationController {
    async index(req, res){
        const checkisProvider = await User.findOne({
            where: { id: req.userId, provider: true},
        });
        if(!checkisProvider){
            return res.status(401).json({ error: 'Only provider can load notifications'})
        }

        const notifications = await Notifications.find({
            user: req.userId
        })
        .sort({ createdAt: 'desc'})
        .limit(20)

        return res.json(notifications);
    }

    //atualiza o read de Notification no MongoDB
    async update(req, res){
        const notification = await Notifications.findByIdAndUpdate(
            req.params.id, //pega o parametro no campo da url
            {read: true}, //troca o valor do campo
            {new: true} //atualiza novamente a notification
            );

            return res.json(notification);
    }
}

export default new NotificationController();