'use strict';
import { BrowserView }    from './Browser.js';
import { PlaylistView }   from './Playlist.js';
import { Playlist }       from '../models/Session.js';
import { ControllerView } from './Controller.js';
import { TopView }        from './Top.js';

const PlayerModeView = {
  view: (vnode) => {
    return m('section.container', [
      m('section.content', [
        m('section.right', [
          m(ControllerView),
          m(PlaylistView)
        ])
      ]),
      m(TopView)
    ]);
  }
};

export { PlayerModeView };
