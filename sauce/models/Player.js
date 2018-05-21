'use strict';

import { Playlist, Session } from './Session.js';

const PlayerModel = {
  current_file: '',
  null_item: { album: '', artist: '', title: '', src: '' },
  current_item: { album: '', artist: '', title: '', src: '' },
  current_index: -1,
  audio: null,
  progress_element: null,
  setup: () => {
    let audio = document.createElement('audio');
    audio.volume = 0.5;
    audio.setAttribute('preload', 'metadata');
    audio.ondurationchange = () => {
      if (PlayerModel.progress_element) PlayerModel.progress_element.max = audio.duration;
    }
    audio.onended = () => {
      PlayerModel.next();
      m.redraw();
    };
    audio.ontimeupdate = () => {
      if (PlayerModel.progress_element) {
        PlayerModel.progress_element.value = audio.currentTime;
      }
    };
    PlayerModel.audio = audio;
  },
  load: () => {
    console.log('load');
    PlayerModel.audio.src = 'api/play/'+PlayerModel.current_item.filename;
  },
  play: () => {
    console.log('playin');
    PlayerModel.audio.play();
  },
  pause: () => {
    PlayerModel.audio.pause();
  },
  stop: () => {
    PlayerModel.pause();
    PlayerModel.seek(0);
  },
  set: (index) => {
    console.log('attempting to set to ' + index);
    PlayerModel.current_item  = Playlist.get(index);
    console.log(PlayerModel.current_item);
    if (!PlayerModel.current_item) {
      PlayerModel.current_item = PlayerModel.null_item;
      PlayerModel.current_index = -1;
    } else {
      PlayerModel.current_index = index;
    }
    PlayerModel.load();
    PlayerModel.play();
  },
  previous: () => {
    PlayerModel.set(PlayerModel.current_index-1);
  },
  next: () => {
    PlayerModel.set(PlayerModel.current_index+1);
  },
  seek: (pos) => {
    PlayerModel.audio.currentTime = pos;
  },
  speed: (speed=1.0) => {
    PlayerModel.audio.playbackRate = speed;
  },
  rewind: () => {
    PlayerModel.seek(PlayerModel.audio.currentTime-5);
  },
  forward: () => {
    PlayerModel.seek(PlayerModel.audio.currentTime+5);
  },
  volume: (val=0.5) => {
    PlayerModel.audio.volume = val;
  },
  setProgressElement: (element) => {
    PlayerModel.progress_element = element;
  }
};

export { PlayerModel };
