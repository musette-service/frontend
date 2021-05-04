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
  oninit: (vnode) => {
    PlayerModel.setup();
    vnode.state.show_timestamp = false;
    vnode.state.timestamp_position = 0;
    vnode.state.timestamp_offset = 0;
  },
  view: (vnode) => {
    let artwork = Playlist.art_cache[PlayerModel.current_item.picture];
    return m("section.controller", [
      m("section.audio-info", [
        m("section.audio-info-background", 
          m("img.audio-info-background-image", { 
            src: artwork
            ?
              'data:' + artwork.format + ';base64,' + _arrayBufferToBase64(artwork.data)
            :
              ''
          })
        ),
        m("section.audio-info-art", [
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
            onclick: (e) => {
              let box = e.target.getBoundingClientRect();
              PlayerModel.seek(PlayerModel.audio.duration * ((e.clientX - box.left) / box.width));
            },
            onmouseover: (e) => {
              vnode.state.show_timestamp = true;
            },
            onmouseout: (e) => {
              vnode.state.show_timestamp = false;
            },
            onmousemove: (e) => {
              let box = e.target.getBoundingClientRect();
              vnode.state.timestamp_position = e.clientX - box.left;
              vnode.state.timestamp_offset = PlayerModel.audio.duration * ((e.clientX - box.left) / box.width);
            },
            value: PlayerModel.audio.currentTime||0,
            max: PlayerModel.audio.duration||0
          }),
          (!vnode.state.show_timestamp?null:[
            m(".audio-info-timestamp", {
              style: {left: vnode.state.timestamp_position+'px'}
            }, PlayerModel.getFormattedTime(vnode.state.timestamp_offset)),
            m(".audio-info-timestamp-indicator", {
              style: {left: vnode.state.timestamp_position+'px'}
            })
          ]),
        ]),
        m(".audio-info-right", [
          m(".audio-info-text", [
            m(".audio-info-title", PlayerModel.current_item.title),
            m("div", [
              m(".audio-info-album", PlayerModel.current_item.album),
              m(".audio-info-year", PlayerModel.current_item.year)
            ]),
            m(".audio-info-artist", PlayerModel.current_item.artist)
          ])
        ])
      ])
    ]);
  }
};

export { ControllerView };
