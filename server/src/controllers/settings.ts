import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async getSettings(ctx) {
    const settingService = strapi.plugin('drag-drop-content-types-strapi5').service('settings');

    try {
      ctx.body = await settingService.getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async setSettings(ctx) {
    const settingService = strapi.plugin('drag-drop-content-types-strapi5').service('settings');
    const { body } = ctx.request;
    const settings = { body };

    try {
      await settingService.setSettings(settings);
      ctx.body = await settingService.getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
