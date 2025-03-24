
import type { Core } from '@strapi/strapi';
import type * as StrapiTypes from '@strapi/types';
import { PluginSettingsResponse, RankUpdate } from '../../../typings';

const dragdrop = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return {
      body: 'Welcome to Strapi 🚀',
    };
  },

  async sortIndex(
    contentType: StrapiTypes.UID.CollectionType,
    _start: number,
    _limit: number,
    _locale: string,
    rankFieldName: string,
    url: string
  ) {
    function assignNested(obj: any, path: string, value: any) {
      const parts = path
        .replace(/\]/g, '')
        .split(/\[|\./)
        .filter(Boolean);

      let current = obj;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = isNaN(Number(parts[i])) ? parts[i] : Number(parts[i]);
        const nextPartIsIndex = !isNaN(Number(parts[i + 1]));

        if (current[part] === undefined) {
          current[part] = nextPartIsIndex ? [] : {};
        }

        current = current[part];
      }

      const lastPart = isNaN(Number(parts[parts.length - 1]))
        ? parts[parts.length - 1]
        : Number(parts[parts.length - 1]);

      current[lastPart] = value;
    }


    try {
      const queryString = url.split('?')[1] || '';
      //@ts-ignore
      const urlParams = new URLSearchParams(queryString);

      let filters: any = {};
      let sortValue = `${rankFieldName}:asc`;
      let page = 1;
      let pageSize = 20;
      let locale = _locale;

      for (const [key, value] of urlParams.entries()) {
        if (key === 'sort') {
          sortValue = value;
        } else if (key === 'page') {
          page = parseInt(value, 10);
        } else if (key === 'pageSize') {
          pageSize = parseInt(value, 10);
        } else if (key === 'locale') {
          locale = value;
        } else if (key.startsWith('filters')) {
          const cleanedKey = key.replace(/^filters\[/, '').replace(/^filters\./, '').replace(/\]$/, '');
          assignNested(filters, cleanedKey, value);
        }
      }

      const start = (page - 1) * pageSize;
      const limit = pageSize;
      const [sortField, sortDir] = sortValue.split(':');

      const indexData = {
        populate: '*',
        start,
        limit,
        locale,
        sort: [{ [sortField]: sortDir?.toLowerCase() || 'asc' }],
        filters,
      };

      // @ts-ignore
      const data = await strapi.documents(contentType).findMany(indexData);
      return data
    } catch (err) {
      strapi.log.error('Error in sortIndex:', err);
      return {};
    }
  },

  async batchUpdate(
    config: PluginSettingsResponse,
    updates: RankUpdate[],
    contentType: StrapiTypes.UID.CollectionType
  ) {
    const shouldTriggerWebhooks = config.body.triggerWebhooks;
    const sortFieldName = config.body.rank;
    const results = [];

    strapi['apiUpdate'] = true;

    for (const update of updates) {
      const allLocalizations = await strapi.db.query(contentType).findOne({
        where: { id: update.id },
        populate: ['localizations'],
      });

      const { localizations, ...origin } = allLocalizations;
      for (const entry of [origin, ...localizations]) {
        const wasPublished = entry.publishedAt !== null;

        const updatedEntry = await strapi.db.query(contentType).update({
          where: { id: entry.id },
          data: {
            [sortFieldName]: update.rank,
            publishedAt: wasPublished ? new Date() : entry.publishedAt,
          },
        });

        if (updatedEntry?.id) {
          results.push(updatedEntry);
        }
      }

      if (shouldTriggerWebhooks) {
        const info: Record<string, unknown> = {
          model: contentType.split('.').at(-1),
          entry: {
            id: origin.id,
            ...origin,
          },
        };

        await strapi.get('webhookRunner').executeListener({
          event: 'entry.update',
          info,
        });
      }
    }

    strapi['apiUpdate'] = undefined;

    return results.map((entry) => ({
      id: entry.id,
      rank: entry[sortFieldName],
    }));
  },
});

export default dragdrop;
