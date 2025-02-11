import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import SortModal from './components/SortModal';
import pluginPermissions from './permissions';

type TradOptions = Record<string, string>;

/**
 * Prefixes plugin translations with the plugin ID.
 * @param {TradOptions} trad - The translations object.
 * @param {string} pluginId - The plugin ID.
 * @returns {TradOptions} - The prefixed translations object.
 * @throws {TypeError} - If pluginId is empty.
 */
const prefixPluginTranslations = (
  trad: TradOptions,
  pluginId: string
): TradOptions => {
  if (!pluginId) {
    throw new TypeError("pluginId can't be empty");
  }
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId}.${current}`] = trad[current];
    return acc;
  }, {} as TradOptions);
};

/**
 * @typedef {object} PluginRegistration
 * @property {(app: any) => void} register - Registers the plugin.
 * @property {(app: any) => void} bootstrap - Bootstraps the plugin.
 * @property {(app: any) => Promise<any>} registerTrads - Registers the translations for the plugin.
 */

/**
 * Plugin registration.
 * @type {PluginRegistration}
 */
export default {
  /**
   * Registers the plugin.
   * @param {any} app - The Strapi app instance.
   */
  register(app: any) {

    app.createSettingSection(
      {
        id: PLUGIN_ID,
        intlLabel: {
          id: `${PLUGIN_ID}.plugin.name`,
          defaultMessage: 'Drag Drop Content Types',
        },
        permissions: pluginPermissions.main,
      },
      [
        {
          intlLabel: {
            id: `${PLUGIN_ID}.plugin.configuration`,
            defaultMessage: 'Configuration',
          },
          id: 'settings',
          to: `${PLUGIN_ID}`,
          Component:() => import('./pages/Settings'),
        },
      ]
    );

    // app.addMenuLink({
    //   to: `plugins/${PLUGIN_ID}`,
    //   icon: PluginIcon,
    //   intlLabel: {
    //     id: `${PLUGIN_ID}.plugin.name`,
    //     defaultMessage: PLUGIN_ID,
    //   },
    //   Component: async () => {
    //     const { App } = await import('./pages/App');

    //     return App;
    //   },
    // });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  /**
   * Bootstraps the plugin.
   * @param {any} app - The Strapi app instance.
   */
  bootstrap(app: any) {
    app.getPlugin('content-manager').injectComponent("listView", "actions", {
      name: "sort-component",
      Component: SortModal,
    });
  },

  /**
   * Registers the translations for the plugin.
   * @async
   * @param {any} app - The Strapi app instance.
   * @returns {Promise<any>} - The imported translations.
   */
  async registerTrads(app: any) {
    const { locales } = app;

    const importedTranslations = await Promise.all(
      (locales as string[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, PLUGIN_ID),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return importedTranslations;
  },

};
