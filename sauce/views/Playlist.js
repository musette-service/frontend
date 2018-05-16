import { Playlist } from '../models/Session.js';
import { BrowserModel } from '../models/Browser.js';
import { PlayerModel } from '../models/Player.js';

const PlaylistView = {
  view: () => {
    return m("section.playlist", [
      m("table", [
        m("thead", [
          m("tr", [
            m("th", {className: "track",  onclick: () => Playlist.sort("track") }, "Track"),
            m("th", {className: "title",  onclick: () => Playlist.sort("title") }, "Title"),
            m("th", {className: "artist", onclick: () => Playlist.sort("artist") }, "Artist"),
            m("th", {className: "album",  onclick: () => Playlist.sort("album") }, "Album")
          ])
        ]),
        m("tbody", Playlist.items.map((item, index) => {
          return m('tr', {class: index == Playlist.current_index ? 'playing' : '', onclick: () => {Playlist.set(index)}}, [
            m('td', item.track),
            m('td', item.title || item.filename),
            m('td', item.artist),
            m('td', item.album)
          ])
        }))
      ])
    ])
    return m("section.playlist", [
      m("nav.playlist-files", Playlist.items.map((item, index) => {
        return m('a', {onclick: () => {PlayerModel.play(item.filename)}}, item.tags.title || item.filename);
      }))
    ]);
  }
};

export { PlaylistView };
