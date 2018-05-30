import { Playlist } from '../models/Session.js';
import { BrowserModel } from '../models/Browser.js';
import { PlayerModel } from '../models/Player.js';

function handleKeypress(e) {
  if (e.keyCode == 46) { // "Delete"
    Playlist.processChecked("remove");
  }
  m.redraw();
}

const PlaylistView = {
  oncreate: () => {
    window.addEventListener('keyup', handleKeypress);
  },
  onremove: () => {
    window.removeEventListener('keyup', handleKeypress);
  },
  view: () => {
    return m("section.playlist", [
      m(".playlist-row-header", [
        m(".playlist-cell.status", ""),
        m(".playlist-cell.track", { onclick: () => Playlist.sort("track") }, "Track"),
        m(".playlist-cell.title", { onclick: () => Playlist.sort("title") }, "Title"),
        m(".playlist-cell.album", { onclick: () => Playlist.sort("album") }, "Album"),
        m(".playlist-cell.artist", { onclick: () => Playlist.sort("artist") }, "Artist"),
        m(".playlist-cell.checkbox", { onclick: () => Playlist.items.forEach((_, i) => Playlist.check(i)) },  m('.micon.checked'))
      ]),
      m(".playlist-items", Playlist.items.map((item, index) => {
        return m(".playlist-row"+ ( item.loading ? '.loading' : '' ) + (PlayerModel.isCurrent(index) ? '.playing' : '') + (Playlist.isSelected(index) ? '.selected' : '') , {
            onclick: (e) => {
              Playlist.clearSelection();
              if (e.shiftKey) {
                const start   = Math.min(Playlist.last_selected, index);
                const end     = Math.max(Playlist.last_selected, index) + 1;
                for (let i = start; i != end; i++) {
                  Playlist.check(i);
                }
              } else {
                Playlist.select(index);
                if (Playlist.last_selected == index) {
                  PlayerModel.set(index)
                }
                Playlist.last_selected = index;
              }
            }
          }, [
          m(".playlist-cell.status", m('.micon' + (item.loading ? '.loading.reverse.flipV.rotate' : PlayerModel.isCurrent(index) ? '.note' : ''))),
          m(".playlist-cell.track", item.track),
          m(".playlist-cell.title", item.title || item.filename),
          m(".playlist-cell.album", item.album),
          m(".playlist-cell.artist", item.artist),
          m(".playlist-cell.checkbox", {
            onclick: (e) => { e.stopPropagation(); Playlist.toggleChecked(index); }
          }, m('.micon.'+(Playlist.isChecked(index) ? 'checked' : 'unchecked')))
        ])
      }))
    ])
  }
};

export { PlaylistView };
