import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize){
        super.init(
            {
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
            },
        {
            sequelize
        }
        );

        this.addHook('beforeSave', async user => {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        }); /*trechos de códigos que são executadas de forma automatica baseado em ações no model*/

        return this;
    }

    //associação da tabela de usuário com File, através da avatar_id
    static associate(models){
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar'});
    }

    checkPassword(password){
        return bcrypt.compare(password, this.password_hash); //Compara a senha normal com a senha criptografada
    }
}

export default User; 