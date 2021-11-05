import m from 'mithril'
import { BrowserView } from './Browser.js'
import { NavBarView } from './NavBar.js'

const BrowserModeView = {
  view: (vnode) => {
    return m('section.container', [
      m(NavBarView),
      m('section.content', [
        m('section.right', [
          m(BrowserView)
        ])
      ])
    ])
  }
}

export { BrowserModeView }
