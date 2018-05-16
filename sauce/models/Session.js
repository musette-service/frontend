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
    Playlist.items.splice(pos, 0, item);
  },
  set: (index=0) => {
    if (index < 0 || index >= Playlist.items.length) return;
    Playlist.current_index = index;
    Playlist.current_item = Playlist.items[Playlist.current_index];
  },
  next: () => {
    Playlist.set(Playlist.current_index+1);
  }
};


export { Playlist, Session };
