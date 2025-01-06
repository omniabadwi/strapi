'use strict';

/**
 * wishlist router
 */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::wishlist.wishlist');
module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/wishlist/add', // هذا هو الـ URL الذي سيقوم React بالاتصال به
      handler: 'wishlist.addToWishlist', // تحديد الدالة التي سيتم استدعاؤها
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
