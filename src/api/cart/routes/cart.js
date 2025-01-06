'use strict';

/**
 * cart router
 */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::cart.cart');
// src/api/cart/routes/cart.js

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/cart/add', // هذا هو الـ URL الذي سيقوم React بالاتصال به
      handler: 'cart.addToCart', // تحديد الدالة التي سيتم استدعاؤها
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
