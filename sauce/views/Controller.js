import { Session } from '../models/Session.js';
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
          src: PlayerModel.current_item.APIC
          ?
            'data:' + PlayerModel.current_item.APIC.data.format + ';base64,' + _arrayBufferToBase64(PlayerModel.current_item.APIC.data.data)
          :
            ''
        }),
        m("span.audio-info-text", [
          m("span.audio-info-artist", PlayerModel.current_item.artist),
          m("span.audio-info-album", PlayerModel.current_item.album),
          m("span.audio-info-title", PlayerModel.current_item.title)
        ]),
        m("progress.audio-info-progress"),
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
        m("input.audio-volume[type='range']")
      ])
    ]);
  }
};

export { ControllerView };
