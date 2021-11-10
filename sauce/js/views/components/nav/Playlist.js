import m from 'mithril'

const PlaylistNav = m('.navbar-item',
  {
    onclick: () => {
      m.route.set('/p/', {}, { replace: true })
    }
  },
  [m('.micon.playlist')]
)

export { PlaylistNav }