import m from 'mithril'

const BrowseNav = m('.navbar-item',
  {
    onclick: () => {
      m.route.set('/b/', {}, { replace: true })
    }
  },
  [m('.micon.folder-open')]
)

export { BrowseNav }