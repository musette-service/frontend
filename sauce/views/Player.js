'use strict';
import { BrowserView }    from './Browser.js';
import { PlaylistView }   from './Playlist.js';
import { Playlist }       from '../models/Session.js';

const PlayerView = {
  view: (vnode) => {
    return m('section.container', [
      m('section.left', [
        m(BrowserView, {dir_path: vnode.attrs.dir_path})
      ]),
      m('section.right', [
        m("section.controller", [
          m("audio.player", { 
            controls: true, 
            autoplay: Playlist.current_index != -1 ? true : false,
            src: '/api/play'+Playlist.current_item.filename,
            onended: () => { Playlist.next() }
          })
        ]),
        m(PlaylistView)
      ])
    ]);
  }
};

export { PlayerView };
