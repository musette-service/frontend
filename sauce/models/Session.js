'use strict';

const Session = {
};

const Playlist = {
  current_index: -1,
  current_item: '',
  items: [],
  insert: (file, pos=Playlist.items.length) => {
    m.request({
      method: 'GET',
      url: '/api/info'+file,
      withCredentials: true
    })
    .then(data => {
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          Playlist._insert(Object.assign({filename: file}, data[i]));
        }
      } else {
        Playlist._insert(Object.assign({filename: file}, data));
      }
    })
    .catch(err => {
      alert(err);
    });
  },
  _insert: (item, pos=Playlist.items.length) => {
    if (item.track) item.track = parseInt(item.track);
    Playlist.items.splice(pos, 0, item);
    if (Playlist.current_index < 0 || Playlist.current_index >= Playlist.items.length) {
      Playlist.set(pos);
    }
  },
  set: (index=0) => {
    if (index < 0 || index >= Playlist.items.length) return;
    Playlist.current_index = index;
    Playlist.current_item = Playlist.items[Playlist.current_index];
  },
  next: () => {
    Playlist.set(Playlist.current_index+1);
  },
  sort: (by) => {
    Playlist.items.sort((a, b) => {
      if (a[by] < b[by]) return -1;
      if (a[by] > b[by]) return 1;
      return 0;
    });
  }
};


export { Playlist, Session };
