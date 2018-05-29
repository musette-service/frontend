const TopView = {
  view: (vnode) => {
    return m('nav.navbar', [
      m('.navbar-item', [m('.micon.musette')]),
      m('.navbar-item', [m('.micon.settings-alt')]),
      m('.navbar-item', [m('.micon.settings')])
    ]);
  }
};

export { TopView };
