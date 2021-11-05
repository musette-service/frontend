import m from 'mithril'
import { Log, App, isMobile } from '../App.js'
import { Config } from '../models/Config.js'
import { PluginsModel } from '../models/Plugins.js'

const SplashView = {
  view: (vnode) => {
    return m('.splash.fadein', [
      m('img.fadeout', {
        src: 'img/musette-1024x1024.png',
        onload: async (e) => {
          if (App.serverAPI !== null) {
            if (isMobile()) {
              m.route.set('/p/', {}, { replace: true })
            } else {
              m.route.set('/f/', {}, { replace: true })
            }
            return
          }
          Log('Requesting server API...')
          e.target.classList.add('fadein')
          try {
            let result = await m.request({
              method: 'GET',
              url: `${Config.serverAddress}/api/`,
              withCredentials: true
            })
            for (let req in result.requires) {
              Log('Plugin: '+req)
              // TODO: We should do a CDN lookup here, but for now we presume its bundled with this install.
              await PluginsModel.loadLocal({name: req, version: result.requires[req], bundled: true})
            }
            Log('Received server API!')
            App.serverAPI = result

            // NOTE: We're presuming there will be no further dynamic plugin requests, as m.route is intended to only be called once per page.
            let pluginRoutes = {}
            for (let p of Object.values(PluginsModel.plugins)) {
              if (p.routes) {
                pluginRoutes = {
                  ...pluginRoutes,
                  ...p.routes
                }
              }
            }

            m.route(document.body, '/splash', {
              ...App.routes,
              ...pluginRoutes,
            })

            if (isMobile()) {
              m.route.set('/p/', {}, { replace: true })
            } else {
              m.route.set('/f/', {}, { replace: true })
            }
          } catch(err) {
            App.handleRequestError(err)
          }
        }
      })
    ], Log.last)
  },
  onbeforeremove: (vnode) => {
    vnode.dom.classList.add('fadeout')
    return new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
  }
}

export { SplashView }
