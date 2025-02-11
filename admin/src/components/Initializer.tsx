import { useEffect, useRef } from 'react';

import { PLUGIN_ID } from '../pluginId';

/**
 * @typedef {object} InitializerProps
 * @property {(id: string) => void} setPlugin - A function to set the plugin.
 */

/**
 * Initializes the plugin.
 * @param {InitializerProps} props - The component props.
 * @returns {null} - This component doesn't render anything.
 */
const Initializer = ({ setPlugin }: { setPlugin: (id: string) => void; }) => {
  const ref = useRef(setPlugin);

  useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);

  return null;
};

export { Initializer };
