/**
 * @typedef {object} RouteConfig
 * @property {string} method - The HTTP method for the route.
 * @property {string} path - The path for the route.
 * @property {string} handler - The handler function for the route.
 * @property {object} config - The configuration for the route.
 * @property {string[]} config.policies - The policies for the route.
 */

/**
 * @typedef {object} SettingsRoute
 * @property {string} type - The type of route.
 * @property {RouteConfig[]} routes - The array of route configurations.
 */

/**
 * Settings route configuration.
 * @type {SettingsRoute}
 */
export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/settings',
      handler: 'settings.getSettings',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/settings',
      handler: 'settings.setSettings',
      config: {
        policies: [],
      },
    },
  ],
};
