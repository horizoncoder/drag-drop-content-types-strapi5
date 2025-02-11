export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/settings',
      handler: 'settings.getSettings',
      config: {
        policies: [
          'strapi::isAuthenticatedAdmin',
          {
            name: 'admin::hasPermissions',
            config: {
              permissions: ['plugin::drag-drop-content-types-strapi5.read'],
            },
          },
        ],
      },
    },
    {
      method: 'POST',
      path: '/settings',
      handler: 'settings.setSettings',
      config: {
        policies: [
          'strapi::isAuthenticatedAdmin',
          {
            name: 'admin::hasPermissions',
            config: {
              permissions: ['plugin::drag-drop-content-types-strapi5.settings.update'],
            },
          },
        ],
      },
    },
  ],
};
