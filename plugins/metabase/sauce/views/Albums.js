'use strict'
import m from 'mithril'

import { MetabaseModel } from '../models/Metabase'
import { AlbumView } from './Album'

const AlbumsView = {
  oncreate: async vnode => {
    await MetabaseModel.requestAlbums()
  },
  oninit: async vnode => {
  },
  view: vnode => {
    return m('section.albums', [
      m('section.metabase-controls', [
        m('.micon.up', {
          onclick: () => {
          }
        }),
        m('.micon.add', {
          onclick: async () => {
            let targets = MetabaseModel.selectedAlbums.map(id => {
              return MetabaseModel.albums.find(v=>v.id===id)
            }).filter(v=>v!==null)
            for (let t of targets) {
              let tracks = await MetabaseModel.requestAlbumTracks(t.id)
              MetabaseModel.addTracks(tracks)
            }
            // Clear old tracks.
            MetabaseModel.clearSelectedAlbums()
          }
        })
      ]),
      m('nav.album-items', {
        onscroll: (e) => {
          // TODO: Iterate through all e.target's children, and for any that don't have a data-loaded attribute, check if they're in view or close to being in view. If true, somehow adjust our albums map to now use the calculated album art url, and set data-loaded to true.
        },
        onupdate: () => {
        }
      }, MetabaseModel.albums.map(v => {
        return m(AlbumView, {
          ...v,
          selected: MetabaseModel.selectedAlbums.find(id=>id===v.id),
          src: MetabaseModel.getAlbumArtURL(v.cover), // TODO: To be adjusted to only specified when onscroll deems the album to be in or have been in view.
          onclick: (id) => {
            MetabaseModel.toggleAlbum(id)
          }
        })
      }))
    ])
  }
}

export { AlbumsView }
