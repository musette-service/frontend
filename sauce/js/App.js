'use strict'

import m from 'mithril'
import { SplashView } from './views/Splash.js'
import { LoginView } from './views/Login.js'
import { FullModeView } from './views/FullMode.js'
import { PlayerModeView } from './views/PlayerMode.js'
import { BrowserModeView } from './views/BrowserMode.js'
import { Log } from './models/Log.js'
import { Layout } from './models/Layout.js'
import { PluginsModel } from './models/Plugins.js'
import { Config } from './models/Config.js'
import { BrowserView } from './views/components/Browser.js'
import { ControllerView } from './views/components/Controller.js'
import { PlaylistView } from './views/components/Playlist.js'
import { BrowseNav } from './views/components/nav/Browse.js'
import { PlaylistNav } from './views/components/nav/Playlist.js'
import { MusetteNav } from './views/components/nav/Musette.js'
import { VolumeNav } from './views/components/nav/Volume.js'
import { Playlist } from './models/Session.js'

window.addEventListener('DOMContentLoaded', () => {
  m.mount(document.body, SplashView)
  // Disallow text selection (this is to allow for shift+clicking without selecting ranges of text. Might be better to hook it directly on those elements, if possible?)
  document.onselectstart = () => { return false }
})

const Title = {
  app_name: 'Musette',
  pre_title: '',
  title_parts: [],
  set: (parts) => {
    Title.title_parts = parts
    Title.sync()
  },
  setPre: (text) => {
    Title.pre_title = text
    Title.sync()
  },
  sync: () => {
    document.title =
      (Title.pre_title ? Title.pre_title + ' ' : '') +
      Title.title_parts.filter((k) => { if (k) return k }).join(' - ') +
      (Title.app_name ? ' ∵ ' + Title.app_name : '')
  }
}
Title.sync()

let _isMobile = null
function isMobile () {
  if (_isMobile == null) {
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) _isMobile = true })(navigator.userAgent || navigator.vendor || window.opera)
  }
  return _isMobile
}

const Auth = {
  login: (username, password) => {
    m.request({
      method: 'POST',
      body: {
        username: username,
        password: password
      },
      url: `${Config.serverAddress}/api/auth/login`,
      withCredentials: true
    })
      .then(result => {
        if (!App.hasAPI()) {
          m.mount(document.body, SplashView)
        } else {
          m.route.set('/splash/', {}, { replace: true })
        }
      })
      .catch(e => {
        Log(e.response.message)
        console.dir(e)
      })
  }
}

const App = {
  handleRequestError: error => {
    if (error.response) {
      if (error.response.status === 401) { // Login request
        // If we got a 401, let's refresh API
        App.serverAPI = null
        Log('Login required.')
        if (App.serverAPI === null) {
          m.mount(document.body, LoginView)
        } else {
          m.route.set('/l/', {}, { replace: true })
        }
      } else {
        Log(error.response.status + ': ' + error.response.message)
      }
    } else {
      Log('unknown error', error)
    }
  },
  hasAPI: () => { App.serverAPI !== null },
  serverAPI: null,
  plugins: PluginsModel,
  loadPlugin: (name, plugin) => {
    PluginsModel.load(name, plugin)
  },
  config: Config,
  routes: {
    '/splash': SplashView,
    '/l': LoginView,
    '/f/': FullModeView,
    '/f/:dir_path...': FullModeView,
    '/p/': PlayerModeView,
    '/p/:dir_path...': PlayerModeView,
    '/b/': BrowserModeView,
    '/b/:dir_path...': BrowserModeView,
  },
  async init(api) {
    App.serverAPI = api

    Layout.mobile = isMobile()
    Layout.components['browser'] = BrowserView
    Layout.components['login'] = LoginView
    Layout.components['controller'] = ControllerView
    Layout.components['playlist'] = PlaylistView
    if (isMobile()) {
      Layout.navigation.add(BrowseNav)
      Layout.navigation.add(PlaylistNav)
      Layout.navigation.add(VolumeNav)
    } else {
      Layout.navigation.add(MusetteNav)
      Layout.navigation.add(VolumeNav)
      Layout.navigations.navbar.push(MusetteNav)
      Layout.navigations.navbar.push(VolumeNav)
    }
    await App.processPlugins()
    App.setupRoutes()
  },
  async processPlugins() {
    for (let req in App.serverAPI.requires) {
      Log('Plugin: '+req)
      // TODO: We should do a CDN lookup here, but for now we presume its bundled with this install.
      let p = await PluginsModel.loadLocal({name: req, version: App.serverAPI.requires[req], bundled: true})
      if (p) p.init({config: Config, playlist: Playlist})
    }
    // NOTE: We're presuming there will be no further dynamic plugin requests, as m.route is intended to only be called once per page.
    for (let p of Object.values(PluginsModel.plugins)) {
      if (p.navigation) {
        for (let c of p.navigation) {
          Layout.navigation.add(c)
        }
      }
      if (p.navigations) {
        for (let [k, v] of Object.entries(p.navigations)) {
          if (Layout.navigations[k]) {
            Layout.navigations[k] = [
              ...Layout.navigations[k],
              ...v
            ]
          }
        }
      }
    }
  },
  setupRoutes() {
    // Collect all our unique plugin routes
    let pluginRoutes = {}
    for (let p of Object.values(PluginsModel.plugins)) {
      if (p.routes) {
        for (let [k, v] of Object.entries(p.routes)) {
          ;((k,v) =>
            pluginRoutes[k] = {
              view: () => {
                return v(Layout)
              }
            }
          )(k,v)
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
  },
}

// FIXME: This isn't quite the right way to do this, but it does allow us to override Config values via a script tag in index.html. This allows a musette client instance to be able to easily point to an external musette server without rebuilding the client from source.
window.musette = {
  config: Config
}

export { Title, Log, Auth, isMobile, App }
