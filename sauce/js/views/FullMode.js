'use strict'
import m from 'mithril'
import { BrowserView } from './Browser.js'
import { PlaylistView } from './Playlist.js'
import { ControllerView } from './Controller.js'
import { TopView } from './Top.js'
import { isMobile } from '../App.js'

const FullModeView = {
  oncreate: (vnode) => {
    setTimeout(() => {
      vnode.dom.classList.add('fadein')
    }, 0)
  },
  view: (vnode) => {
    return m('section.container.fadeout', [
      isMobile() ? null : m(TopView),
      m('section.content', [
        m('section.left', [
          m(BrowserView, { dir_path: vnode.attrs.dir_path })
        ]),
        m('section.right', [
          m(ControllerView),
          m(PlaylistView)
        ])
      ]),
      isMobile() ? m(TopView) : null
    ])
  }
}

export { FullModeView }
