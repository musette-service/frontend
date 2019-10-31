'use strict';

import { Playlist, Session } from './Session.js';
import { Title } from '../App.js';

const PlayerModel = {
  current_file: '',
  null_item: { album: '', artist: '', title: '', src: '' },
  current_item: { album: '', artist: '', title: '', src: '' },
  current_index: -1,
  audio: null,
  audio_ctx: null,
  gain_node: null,
  progress_element: null,
  setup: () => {
    let audio_ctx = new (window.AudioContext || window.webkitAudioContext)();
    let gain_node = audio_ctx.createGain();

    let audio = document.createElement('audio');
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
    audio.onplaying = () => {
      Title.setPre('🎶');
    };
    audio.onpause = () => {
      Title.setPre('');
    };
    audio.oncanplaythrough = () => {
      PlayerModel.play()
    };


    let source = audio_ctx.createMediaElementSource(audio);
    source.connect(gain_node);
    gain_node.connect(audio_ctx.destination);
    gain_node.gain.setValueAtTime(0.5, audio_ctx.currentTime);

    PlayerModel.gain_node = gain_node;
    PlayerModel.audio = audio;
    PlayerModel.audio_ctx = audio_ctx;
  },
  load: () => {
    console.log('load');
    Title.set([PlayerModel.current_item.title, PlayerModel.current_item.album, PlayerModel.current_item.artist]);
    PlayerModel.audio.src = 'api/play'+encodeURIComponent('/'+PlayerModel.current_item.filename);
  },
  play: () => {
    PlayerModel.audio.play();
  },
  pause: () => {
    PlayerModel.audio.pause();
  },
  stop: () => {
    PlayerModel.pause();
    PlayerModel.seek(0);
  },
  verifyState: () => {
    if (PlayerModel.audio_ctx.state == 'suspended') PlayerModel.audio_ctx.resume();
  },
  set: (index) => {
    console.log('attempting to set to ' + index);
    PlayerModel.current_item  = Playlist.get(index);
    if (!PlayerModel.current_item) {
      PlayerModel.current_item = PlayerModel.null_item;
      PlayerModel.current_index = -1;
    } else {
      PlayerModel.current_index = index;
    }
    PlayerModel.load();
    PlayerModel.play();
    PlayerModel.verifyState();
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
    PlayerModel.seek(PlayerModel.audio.currentTime-1);
  },
  forward: () => {
    PlayerModel.seek(PlayerModel.audio.currentTime+1);
  },
  volume: (val=0.5) => {
    PlayerModel.gain_node.gain.value = val;
  },
  getVolume: () => {
    return PlayerModel.gain_node.gain.value;
  },
  setProgressElement: (element) => {
    PlayerModel.progress_element = element;
  },
  isCurrent: index => {
    return index == PlayerModel.current_index;
  }
};

export { PlayerModel };
