import { Playlist } from '../models/Session.js';
import { BrowserModel } from '../models/Browser.js';
import { PlayerModel } from '../models/Player.js';

const PlaylistView = {
  view: () => {
    return m("section.playlist", [
      m("table", [
        m("thead", [
          m("tr", [
            m("th", {className: "track"}, "Track"),
            m("th", {className: "title"}, "Title"),
            m("th", {className: "artist"}, "Artist"),
            m("th", {className: "album"}, "Album")
          ])
        ]),
        m("tbody", Playlist.items.map((item, index) => {
          return m('tr', {onclick: () => {Playlist.set(index)}}, [
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
