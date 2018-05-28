import { Session, Playlist } from '../models/Session.js';
import { PlayerModel } from '../models/Player.js';

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
        m("img.audio-info-background", { 
          src: PlayerModel.current_item.picture
          ?
            'data:' + Session.art_cache[PlayerModel.current_item.picture].format + ';base64,' + _arrayBufferToBase64(Session.art_cache[PlayerModel.current_item.picture].data)
          :
            ''
        }),
        m("section.audio-info-album", [
          m("img.audio-info-image", { 
            src: PlayerModel.current_item.picture
            ?
              'data:' + Session.art_cache[PlayerModel.current_item.picture].format + ';base64,' + _arrayBufferToBase64(Session.art_cache[PlayerModel.current_item.picture].data)
            :
              ''
          }),
          m("progress.audio-info-progress", {
            oncreate: (vnode) => {
              // We keep track of this directly so we don't call m.redraw for every update
              PlayerModel.setProgressElement(vnode.dom);
            },
            value: PlayerModel.audio.currentTime||0,
            max: PlayerModel.audio.duration||0
          }),
          m('.micon.' + (PlayerModel.audio.paused ? 'play' : 'pause'), {
            onclick: PlayerModel.audio.paused ? PlayerModel.play : PlayerModel.pause,
            class: 'audio-info-album-play'
          })
        ]),
        m(".audio-info-text", [
          m(".audio-info-title", PlayerModel.current_item.title),
          m(".audio-info-album", PlayerModel.current_item.album),
          m(".audio-info-artist", PlayerModel.current_item.artist)
        ]),
        m("section.audio-controller", [
          m("button.shuffle"),
          m("button.repeat"),
          m(".audio-buttons", [
            m('.micon.previous', { onclick: PlayerModel.previous } ),
            m('.micon.rewind', { onclick: PlayerModel.rewind } ),
            m('.micon.' + (PlayerModel.audio.paused ? 'play' : 'pause'), { 
              onclick: PlayerModel.audio.paused ? PlayerModel.play : PlayerModel.pause
            } ),
            m('.micon.forward', { onclick: PlayerModel.forward } ),
            m('.micon.next', { onclick: PlayerModel.next } )
          ]),
          m("input.audio-volume[type='range']", {
            min: 0, max: 100,
            onchange: e => {
              PlayerModel.volume(e.target.value/100);
            },
            value: PlayerModel.audio.volume*100
          })
        ])
      ])
    ]);
  }
};

export { ControllerView };
