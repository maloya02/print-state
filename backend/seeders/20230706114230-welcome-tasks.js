'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Tasks', [
      {
        id: 'e253dde5-ca54-4bb8-ad53-f923b1846545',
        avatar: null,
        name: 'John Doe',
        description: 'Welcome John Doe',
        completed: false,
        priority: 'low'
      },
      {
        id: '6bfbd80e-eb92-41aa-a4c4-2e4a94412eda',
        avatar: null,
        name: 'Jane Doe',
        description: 'Welcome Jane Doe',
        completed: false,
        priority: 'low'
      },
      {
        id: 'e14ce52a-bfad-4ab4-8979-fd755d325063',
        avatar: null,
        name: 'Mac Doe',
        description: 'Welcome Mac Doe',
        completed: false,
        priority: 'low'
      },
     ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
