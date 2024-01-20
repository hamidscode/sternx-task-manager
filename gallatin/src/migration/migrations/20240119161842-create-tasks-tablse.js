'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface
        .createTable(
          'tasks',
          {
            id: {
              type: Sequelize.UUID,
              allowNull: false,
              unique: true,
              primaryKey: true,
              defaultValue: Sequelize.UUIDV4,
            },
            parent_id: {
              type: Sequelize.UUID,
              allowNull: true,
            },
            title: {
              type: Sequelize.STRING(256),
              allowNull: false,
            },
            description: {
              type: Sequelize.TEXT,
              defaultValue: '',
              allowNull: true,
            },
            created_at: {
              type: Sequelize.DATE,
              allowNull: false,
            },
            updated_at: {
              type: Sequelize.DATE,
              allowNull: true,
            },
            deleted_at: {
              type: Sequelize.DATE,
              allowNull: true,
            },
          },
          {
            transaction: t,
            logging: console.log,
            uniqueKeys: {},
          },
        )
        .then(() => {
          return Promise.all([
            queryInterface.addConstraint('tasks', {
              type: 'foreign key',
              name: 'task_parent_id_fk',
              fields: ['parent_id'],
              references: {
                table: 'tasks',
                field: 'id',
              },
              onDelete: 'restrict',
              onUpdate: 'restrict',
              transaction: t,
            }),
            queryInterface.addIndex('tasks', ['title'], {
              name: 'task_title',
              transaction: t,
            }),
            queryInterface.addIndex('tasks', ['created_at'], {
              name: 'task_created_at',
              transaction: t,
            }),
            queryInterface.addIndex('tasks', ['parent_id'], {
              name: 'task_parent_id_fk',
              transaction: t,
            }),
          ]);
        });
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('tasks', { transaction: t }),
      ]);
    });
  },
};
