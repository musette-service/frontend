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
    let plugin = null
    try {
      let r = await import(`${Config.pluginsRoot}${name}/index.js`)
      plugin = r.default
      PluginsModel.plugins[name] = plugin
    } catch(err) {
      Log(`Failed to load ${name}:`, err)
    }
    // Try to also load a CSS file.
    let el = document.createElement('link')
    el.setAttribute('rel', 'stylesheet')
    el.setAttribute('href', `${Config.pluginsRoot}${name}/index.css`)
    el.addEventListener('error', e => {
      // Remove from head if errror occurred.
      document.head.removeChild(el)
    })
    document.head.appendChild(el)
    return plugin
  },
}

export { PluginsModel }
