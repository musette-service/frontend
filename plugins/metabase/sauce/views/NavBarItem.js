import m from 'mithril'

const NavBarItem = {
  view: vnode => {
    return m('.navbar-item', {
      onclick: () => {
        m.route.set('/metabase/album', {}, { replace: true })
      },
    }, [m('.micon.plugin-metabase')])
  }
}

export { NavBarItem }
