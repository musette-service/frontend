import m from 'mithril'

const NavBarAlbum = {
  view: vnode => {
    return m('.micon.plugin-metabase', {
      onclick: () => {
        m.route.set('/metabase/album', {}, { replace: true })
      },
    })
  }
}

export { NavBarAlbum }
