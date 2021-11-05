'use strict'
import m from 'mithril'
import { PlaylistView } from './Playlist.js'
import { ControllerView } from './Controller.js'
import { NavBarView } from './NavBar.js'

const PlayerModeView = {
  view: (vnode) => {
    return m('section.container', [
      m(NavBarView),
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
