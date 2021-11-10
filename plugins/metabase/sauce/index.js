'use strict'
import m from 'mithril'

import { MetabaseModel } from './models/Metabase.js'

import { MetabaseView } from './views/Metabase.js'
import { AlbumsView } from './views/Albums.js'
import { NavBarItem } from './views/NavBarItem.js'
import { NavBarAlbum } from './views/NavBarAlbum.js'

const MetabasePlugin = {
  init: ({config, playlist}) => {
    MetabaseModel.init({config, playlist})
    console.log('MetabasePlugin init')
  },
  navigation: [NavBarItem],
  navigations: {
    navbar: [NavBarItem],
    browsebar: [NavBarAlbum],
  },
  components: {
    'metabase-navitem': NavBarItem,
    'metabase-view': MetabaseView,
    'metabase-albums': AlbumsView,
  },
  routes: {
    '/metabase/player': b => {
      return m('section.container', [
        m(b.component('navbar')),
        m('section.content', [
          m('section.left', [
            m(b.component('browser')),
          ]),
          m('section.right', [
            m(b.component('controller')),
            m(b.component('playlist')),
          ]),
        ])
      ])
    },
    '/metabase/album': b => {
      if (b.mobile) {
        return m('section.container', [
          m(b.component('navbar')),
          m('section.content', [
            m(AlbumsView),
          ])
        ])
      }
      return m('section.container', [
        m(b.component('navbar')),
        m('section.content', [
          m('section.left', [
            m(AlbumsView)
          ]),
          m('section.right', [
            m(b.component('controller')),
            m(b.component('playlist')),
          ])
        ])
      ])
    },
  },
}

export default MetabasePlugin