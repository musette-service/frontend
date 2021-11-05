import m from 'mithril'

const NavBarView = {
  view: (vnode) => {
    return m('nav.navbar', [
      m('.navbar-item', {
        onclick: () => {
          m.route.set('/b/', {}, { replace: true })
        }
      }, [m('.micon.folder-open')]),
      m('.navbar-item', {
        onclick: () => {
          m.route.set('/p/', {}, { replace: true })
        }
      }, [m('.micon.playlist')])
    ])
  }
}

export { NavBarView }
