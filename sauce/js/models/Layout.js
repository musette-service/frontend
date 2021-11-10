'use strict'

import m from 'mithril'

const Layout = {
  mobile: false,
  navigation: {
    components: [],
    add(component) {
      Layout.navigation.components.push(component)
    },
  },
  navigations: {
    browsebar: [],
    navbar: [],
  },
  components: {
    navbar() {
      return {
        view: () => {
          return m('nav.navbar', Layout.navigation.components.map(v=>m(v)))
        }
      }
    },
    browsebar() {
      return {
        view: () => {
          return m('nav.navbar', Layout.navigation.components.map(v=>m(v)))
        }
      }
    },
  },
  component(name) {
    let t = Layout.components[name]
    if (typeof t === 'function') {
        return t()
    }
    return t
  },
}

export { Layout }