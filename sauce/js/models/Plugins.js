'use strict'

import { App } from '../App.js'
import { Log } from './Log.js'
import { Config } from './Config.js'

const PluginsModel = {
  plugins: {},
  load: async ({name, version="1.0.0"}={}) => {
    if (Config.localPlugins) {
      return PluginsModel.loadLocal({name, version})
    }
    throw "no non-local plugins available yet"
  },
  loadLocal: async ({name, version="1.0.0"}={}) => {
    let r = await import(`${Config.pluginsRoot}${name}/index.js`)
    let plugin = r.default
    PluginsModel.plugins[name] = plugin
    plugin.init(App)
    return plugin
  },
}

export { PluginsModel }
