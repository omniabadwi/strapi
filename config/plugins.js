module.exports = ({ env }) => ({
  // ...
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["SignUpforNewsletter", "first_name", "last_name","password_confirmation"],
      },
    },
  },
  upload: {
    config: {
      provider: '@strapi/provider-upload-cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
    },
  },
  // ...
});