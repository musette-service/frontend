import { BrowserView }    from './Browser.js';
import { TopView }        from './Top.js';
import { NavBarView }        from './NavBar.js';

const BrowserModeView = {
  view: (vnode) => {
    return m('section.container', [
      m('section.content', [
        m('section.right', [
          m(BrowserView)
        ])
      ]),
      m(NavBarView)
    ]);
  }
};

export { BrowserModeView };
