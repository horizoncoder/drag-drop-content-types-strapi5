/**
 * @typedef {object} PluginPermissions
 * @property {object[]} main - The main permissions for the plugin.
 * @property {string} main[].action - The action for the permission.
 * @property {null} main[].subject - The subject for the permission.
 */

/**
 * Plugin permissions.
 * @type {PluginPermissions}
 */
const pluginPermissions = {
  main: [{ action: 'plugin::drag-drop-content-types-strapi5.read', subject: null }],
};
export default pluginPermissions;
