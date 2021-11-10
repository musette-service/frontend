'use strict'
import m from 'mithril'
import { BrowserView } from './components/Browser.js'
import { PlaylistView } from './components/Playlist.js'
import { ControllerView } from './components/Controller.js'
import { isMobile } from '../App.js'
import { Layout } from '../models/Layout.js'

const FullModeView = {
  oncreate: (vnode) => {
    setTimeout(() => {
      vnode.dom.classList.add('fadein')
    }, 0)
  },
  view: (vnode) => {
    return m('section.container.fadeout', [
      isMobile() ? null : m(Layout.component('navbar')),
      m('section.content', [
        m('section.left', [
          m(BrowserView, { dir_path: vnode.attrs.dir_path })
        ]),
        m('section.right', [
          m(ControllerView),
          m(PlaylistView)
        ])
      ]),
      isMobile() ? Layout.component('navbar') : null
    ])
  }
}

export { FullModeView }
