'use strict';

/**
 * repair service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::repair.repair');
