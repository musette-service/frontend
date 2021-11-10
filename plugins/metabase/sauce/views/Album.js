'use strict'
import m from 'mithril'

import '../css/Album.css'

const AlbumView = {
  view: vnode => {
    return m('.album-item'+(vnode.attrs.selected?'.-selected':''), {
      onclick: () => {
        vnode.attrs.onclick(vnode.attrs.id)
      }
    }, [
      m('.album-item-art', m('img', {src: vnode.attrs.src})),
      m('.album-item-info', [
        m('.album-item-info-title', vnode.attrs.title),
        m('.album-item-info-year', vnode.attrs.year),
      ]),
      m('.album-item-selected', vnode.attrs.selected?m('.micon.checked'):null)
    ])
  }
}

export { AlbumView }
