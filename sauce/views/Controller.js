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
  view: (vnode) => {
    let artwork = Playlist.art_cache[PlayerModel.current_item.picture];
    return m("section.controller", [
      m("section.audio-info", [
        m("img.audio-info-background", { 
          src: artwork
          ?
            'data:' + artwork.format + ';base64,' + _arrayBufferToBase64(artwork.data)
          :
            ''
        }),
        m("section.audio-info-album", [
          m("img.audio-info-image", { 
            src: artwork
            ?
              'data:' + artwork.format + ';base64,' + _arrayBufferToBase64(artwork.data)
            :
              ''
          }),
          m(".audio-info-controls", [
            m('.micon.rewind', {
              ontouchstart: e => {
                vnode.state.activity_time = new Date();
                vnode.state.timeout = window.setInterval((e) => {
                  if ((new Date() - vnode.state.activity_time) >= 200) PlayerModel.rewind();
                }, 100);
                e.preventDefault();
              },
              ontouchend: e => {
                if ((new Date() - vnode.state.activity_time) <= 200) PlayerModel.previous();
                window.clearInterval(vnode.state.timeout);
                e.preventDefault();
              },
              onmousedown: e => {
                vnode.state.activity_time = new Date();
                vnode.state.timeout = window.setInterval((e) => {
                  if ((new Date() - vnode.state.activity_time) >= 200) PlayerModel.rewind();
                }, 100);
              },
              onmouseup: e => {
                if ((new Date() - vnode.state.activity_time) <= 200) PlayerModel.previous();
                window.clearInterval(vnode.state.timeout);
              }
            }),
            m('.micon.' + (PlayerModel.audio.paused ? 'play' : 'pause'), {
              onclick: PlayerModel.audio.paused ? PlayerModel.play : PlayerModel.pause
            }),
            m('.micon.forward', {
              ontouchstart: e => {
                vnode.state.activity_time = new Date();
                vnode.state.timeout = window.setInterval((e) => {
                  if ((new Date() - vnode.state.activity_time) >= 200) PlayerModel.forward();
                }, 100);
                e.preventDefault();
              },
              ontouchend: e => {
                if ((new Date() - vnode.state.activity_time) <= 200) PlayerModel.next();
                window.clearInterval(vnode.state.timeout);
                e.preventDefault();
              },
              onmousedown: e => {
                vnode.state.activity_time = new Date();
                vnode.state.timeout = window.setInterval((e) => {
                  if ((new Date() - vnode.state.activity_time) >= 200) PlayerModel.forward();
                }, 100);
              },
              onmouseup: e => {
                if ((new Date() - vnode.state.activity_time) <= 200) PlayerModel.next();
                window.clearInterval(vnode.state.timeout);
              }
            })
          ]),
          m("progress.audio-info-progress", {
            oncreate: (vnode) => {
              // We keep track of this directly so we don't call m.redraw for every update
              PlayerModel.setProgressElement(vnode.dom);
            },
            value: PlayerModel.audio.currentTime||0,
            max: PlayerModel.audio.duration||0
          })
        ]),
        m(".audio-info-text", [
          m(".audio-info-title", PlayerModel.current_item.title),
          m(".audio-info-album", PlayerModel.current_item.album),
          m(".audio-info-artist", PlayerModel.current_item.artist)
        ]),
        m("section.audio-controller", [
          m(".audio-volume", [
            m('.micon.volume100'),
            m("input[type='range'][orient='vertical']", {
              min: 0, max: 100,
              onchange: e => {
                PlayerModel.volume(parseInt(e.target.value)/100);
              },
              value: PlayerModel.audio.volume*100
            }),
            m('.micon.volume0'),
          ])
        ])
      ])
    ]);
  }
};

export { ControllerView };
