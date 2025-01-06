'use strict';

/**
 * wishlist controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// // module.exports = createCoreController('api::wishlist.wishlist');
// module.exports = {
//   async addToWishlist(ctx) {
//     try {
//       const { productId, userId } = ctx.request.body;

//       // التحقق من البيانات المُدخلة
//       if (!productId || !userId) {
//         return ctx.badRequest('Product ID and User ID are required');
//       }

//       // البحث عن المستخدم باستخدام البريد الإلكتروني
//       const user = await strapi.query('plugin::users-permissions.user').findOne({
//         where: { email: userId },
//       });

//       if (!user) {
//         return ctx.badRequest('User not found');
//       }

//       // البحث عن سلة المستخدم
//       let wishlist = await strapi.entityService.findMany('api::wishlist.wishlist', {
//         filters: { users_permissions_user: user.id }, // استخدمي الحقل الصحيح
//         populate: ['products'],
//       });

//       // إنشاء سلة جديدة إذا لم تكن موجودة
//       if (!wishlist.length) {
//         await strapi.entityService.create('api::wishlist.wishlist', {
//           data: {
//             users_permissions_user: user.id, // الحقل الصحيح
//             products: [productId],
//           },
//         });
//       } else {
//         // تحديث المنتجات في السلة الحالية
//         const wishlistId = wishlist[0].id;
//         const existingProducts = wishlist[0].products.map((p) => p.id);

//         await strapi.entityService.update('api::wishlist.wishlist', wishlistId, {
//           data: {
//             products: [...existingProducts, productId],
//           },
//         });
//       }

//       return ctx.send({ message: 'Product added to wishlist successfully!' });
//     } catch (error) {
//       console.error(error);
//       return ctx.badRequest('Error adding product to wishlist', { error });
//     }
//   },
// };
module.exports = {
  async addToWishlist(ctx) {
    try {
      const { productId, userId } = ctx.request.body;

      // التحقق من البيانات المُدخلة
      if (!productId || !userId) {
        return ctx.badRequest('Product ID and User ID are required');
      }

      // البحث عن المستخدم باستخدام البريد الإلكتروني
      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: { email: userId },
      });

      if (!user) {
        return ctx.badRequest('User not found');
      }

      // البحث عن المنتج باستخدام documentId بدلاً من id
      const product = await strapi.query('api::product.product').findOne({
        where: { documentId: productId }, // استخدام documentId للبحث عن المنتج
      });

      if (!product) {
        return ctx.badRequest('Product not found with the given documentId');
      }

      // البحث عن قائمة الـ Wishlist الخاصة بالمستخدم
      let wishlist = await strapi.entityService.findMany('api::wishlist.wishlist', {
        filters: { users_permissions_user: user.id },
        populate: { products: true },
      });

      if (wishlist.length > 0) {
        const wishlistId = wishlist[0].id;
        const existingProducts = wishlist[0].products.map((p) => p.id);

        // تحقق إذا كان المنتج موجودًا مسبقًا في الـ Wishlist
        if (existingProducts.includes(product.id)) {  // استخدم id المنتج بدلاً من documentId
          return ctx.send({ message: 'Product is already in the wishlist.' });
        }

        // إذا لم يكن المنتج موجودًا، قم بإضافته
        await strapi.entityService.update('api::wishlist.wishlist', wishlistId, {
          data: {
            products: [...existingProducts, { id: product.id }], // ربط باستخدام id المنتج
          },
        });

        return ctx.send({ message: 'Product added to wishlist successfully!' });
      } else {
        // إنشاء قائمة Wishlist جديدة إذا لم تكن موجودة
        await strapi.entityService.create('api::wishlist.wishlist', {
          data: {
            users_permissions_user: user.id,
            products: [{ id: product.id }], // ربط باستخدام id المنتج
          },
        });

        return ctx.send({ message: 'Product added to wishlist successfully!' });
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      return ctx.badRequest('Error adding product to wishlist', { error });
    }
  },
};



