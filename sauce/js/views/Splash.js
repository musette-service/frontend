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
          // If we have API, simply travel to our next route.
          if (App.hasAPI()) {
            try {
              if (isMobile()) {
                m.route.set('/p/', {}, { replace: true })
              } else {
                m.route.set('/f/', {}, { replace: true })
              }
            } catch(err) {
              App.handleRequestError(err)
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
            Log('Received server API!')
            await App.init(result)
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
