import type { Core } from '@strapi/strapi';

/**
 * @typedef {object} SettingsController
 * @property {(ctx: any) => Promise<void>} getSettings - Gets the settings.
 * @property {(ctx: any) => Promise<void>} setSettings - Sets the settings.
 */

/**
 * Settings controller.
 * @param {object} params - The parameters object.
 * @param {Core.Strapi} params.strapi - The Strapi instance.
 * @returns {SettingsController}
 */
export default ({ strapi }: { strapi: Core.Strapi }) => ({
  /**
   * Gets the settings.
   * @async
   * @param {object} ctx - The context object.
   * @returns {Promise<void>}
   * @throws {Error}
   */
  async getSettings(ctx) {
    const settingService = strapi.plugin('drag-drop-content-types-strapi5').service('settings');

    try {
      ctx.body = await settingService.getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  /**
   * Sets the settings.
   * @async
   * @param {object} ctx - The context object.
   * @returns {Promise<void>}
   * @throws {Error}
   */
  async setSettings(ctx) {
    const settingService = strapi.plugin('drag-drop-content-types-strapi5').service('settings');
    const { body } = ctx.request;

    try {
      await settingService.setSettings(body);
      ctx.body = await settingService.getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
