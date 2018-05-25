'use strict';
import { BrowserView }    from './Browser.js';
import { PlaylistView }   from './Playlist.js';
import { Playlist }       from '../models/Session.js';
import { ControllerView } from './Controller.js';

const FullModeView = {
  oncreate: (vnode) => {
    setTimeout(() => {
      vnode.dom.classList.add('fadein');
    }, 0);
  },
  view: (vnode) => {
    return m('section.container.fadeout', [
      m('section.left', [
        m(BrowserView, {dir_path: vnode.attrs.dir_path})
      ]),
      m('section.right', [
        m(ControllerView),
        m(PlaylistView)
      ])
    ]);
  }
};

export { FullModeView };
