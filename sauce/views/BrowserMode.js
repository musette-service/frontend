import { BrowserView }    from './Browser.js';
import { TopView }        from './Top.js';

const BrowserModeView = {
  view: (vnode) => {
    return m('section.container', [
      m('section.content', [
        m('section.right', [
          m(BrowserView)
        ])
      ]),
      m(TopView)
    ]);
  }
};

export { BrowserModeView };
