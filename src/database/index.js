import Sequelize from 'sequelize';

import User from '../app/models/User'; //conexão com os models

import databaseConfig from '../config/database'; //conexão com a base de dados

const models = [User]; //array com todos os Models da aplicação

class Database {
    constructor(){
        this.init();
    }

    init(){ //faz a conexão com o banco de dados e carrega os Models
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection)); //conexao do model com o BD
    }
}

export default new Database();