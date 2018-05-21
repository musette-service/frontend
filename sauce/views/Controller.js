import { Session, Playlist } from '../models/Session.js';
import { PlayerModel } from '../models/Player.js';
import { BytesizeIcon } from './BytesizeIcon.js';

function _arrayBufferToBase64( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

const ControllerView = {
  oninit: () => {
    PlayerModel.setup();
  },
  view: () => {
    return m("section.controller", [
      m("section.audio-info", [
        m("img.audio-info-image", { 
          src: PlayerModel.current_item.picture
          ?
            'data:' + Session.art_cache[PlayerModel.current_item.picture].format + ';base64,' + _arrayBufferToBase64(Session.art_cache[PlayerModel.current_item.picture].data)
          :
            ''
        }),
        m(".audio-info-text", [
          m(".audio-info-title", PlayerModel.current_item.title),
          m(".audio-info-album", PlayerModel.current_item.album),
          m(".audio-info-artist", PlayerModel.current_item.artist)
        ]),
        m("progress.audio-info-progress", {
          oncreate: (vnode) => {
            // We keep track of this directly so we don't call m.redraw for every update
            PlayerModel.setProgressElement(vnode.dom);
          },
          value: PlayerModel.audio.currentTime||0,
          max: PlayerModel.audio.duration||0
        }),
      ]),
      m("section.audio-controller", [
        m("button.shuffle"),
        m("button.repeat"),
        m(".audio-buttons", [
          m(BytesizeIcon, { onclick: PlayerModel.previous, class: 'start' } ),
          m(BytesizeIcon, { onclick: PlayerModel.rewind, class: 'backwards' } ),
          m(BytesizeIcon, { onclick: PlayerModel.stop, class: 'pause' } ),
          m(BytesizeIcon, { onclick: PlayerModel.play, class: 'play' } ),
          m("button.play-pause", { onclick: () => { PlayerModel.audio.paused ? PlayerModel.play() : PlayerModel.pause() } }, "p" ),
          m(BytesizeIcon, { onclick: PlayerModel.forward, class: 'forwards' } ),
          m(BytesizeIcon, { onclick: PlayerModel.next, class: 'end' } )
        ]),
        m("input.audio-volume[type='range']", {
          min: 0, max: 100,
          onchange: e => {
            PlayerModel.volume(e.target.value/100);
          },
          value: PlayerModel.audio.volume*100
        })
      ])
    ]);
  }
};

export { ControllerView };
