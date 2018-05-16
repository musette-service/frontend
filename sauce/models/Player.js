'use strict';

import { Playlist, Session } from './Session.js';

const PlayerModel = {
  current_file: '',
  play: (t) => {
    // TODO: some "play" check
    PlayerModel.current_file = t;
    m.redraw();
    /*m.request({
      method: 'GET',
      url: '/api/play'+t,
      withCredentials: true
    })
    .then(data => {
      PlayerModel.current_file = t;
    })
    .catch(err => {
      alert(err);
    });*/
    //m.redraw();
  }
};

export { PlayerModel };
