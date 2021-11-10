import m from 'mithril'

const MusetteNav = {
  view: vnode => {
    return m('.navbar-item', {
      onclick: () => {
        m.route.set('/f/', {}, { replace: true })
      },
    }, [m('.micon.musette')])
  }
}

export { MusetteNav }