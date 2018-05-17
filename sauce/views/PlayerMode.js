'use strict';
import { BrowserView }    from './Browser.js';
import { PlaylistView }   from './Playlist.js';
import { Playlist }       from '../models/Session.js';
import { ControllerView } from './Controller.js';

const PlayerModeView = {
  view: (vnode) => {
    return m('section.container', [
      m('section.right', [
        m(ControllerView),
        m(PlaylistView)
      ])
    ]);
  }
};

export { PlayerModeView };
