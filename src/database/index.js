import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User'; //conexão com os models
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database'; //conexão com a base de dados

const models = [User, File, Appointment]; //array com todos os Models da aplicação

class Database {
    constructor(){
        this.init();
        this.mongo();
    }
        //faz a conexão com o banco de dados e carrega os Models
    init(){ 
        this.connection = new Sequelize(databaseConfig);

        models
        .map(model => model.init(this.connection)) //conexao do model com o BD
        .map(model => model.associate && model.associate(this.connection.models)); 
    }

    mongo(){
        this.mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/gobarber',
            {useNewUrlParser: true, useUnifiedTopology: true}
        )
    }
}

export default new Database();