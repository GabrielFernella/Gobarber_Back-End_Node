'use strict';

//Adicionando uma coluna nova na tabela de usuários 
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'users', //nome da tabela 
        'avatar_id', //nome da coluna
          {
            type: Sequelize.INTEGER,
            references: { model: 'files',/*Nome da tabela que está referenciando*/ key: 'id' /*Coluna da tabela*/},
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
          }
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'avatar_id');
  }
};
