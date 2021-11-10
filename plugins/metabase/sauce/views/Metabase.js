'use strict'
import m from 'mithril'

const MetabaseView = {
  oncreate: (vnode) => {
  },
  oninit: vnode => { },
  view: vnode => {
    return m('section.metabase', [
      m('section.metabase-controls', [
        m('.micon.up', {
          onclick: () => {
          }
        }),
        m('.micon.add', {
        })
      ]),
      m('nav.metabase-items', {
        onscroll: (e) => {
        },
        onupdate: () => {
        }
      })
    ])
  }
}

export { MetabaseView }
