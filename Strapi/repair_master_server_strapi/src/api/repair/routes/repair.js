'use strict';

/**
 * repair router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::repair.repair');
