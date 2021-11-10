'use strict'
import m from 'mithril'
import { PlaylistView } from './components/Playlist.js'
import { ControllerView } from './components/Controller.js'
import { isMobile } from '../App.js'
import { Layout } from '../models/Layout.js'

const PlayerModeView = {
  view: (vnode) => {
    return m('section.container', [
      isMobile() ? null : m(Layout.component('navbar')),
      m('section.content', [
        m('section.right', [
          m(ControllerView),
          m(PlaylistView)
        ])
      ])
    ])
  }
}

export { PlayerModeView }
