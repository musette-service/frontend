'use strict'
import m from 'mithril'
import { BrowserView } from './components/Browser.js'
import { isMobile } from '../App.js'
import { Layout } from '../models/Layout.js'

const BrowserModeView = {
  view: (vnode) => {
    return m('section.container', [
      isMobile() ? null : m(Layout.component('navbar')),
      m('section.content', [
        m('section.right', [
          m(BrowserView)
        ])
      ])
    ])
  }
}

export { BrowserModeView }
