'use strict';

const Session = {
  art_cache: {}
};

const Playlist = {
  current_index: -1,
  current_item: '',
  items: [],
  selected_items: [],
  last_selected: -1,
  insert: (base_path, files, pos=Playlist.items.length) => {
    if (!Array.isArray(files)) files = [files];

    let to_update = [];
    files.forEach((k, i) => {
      to_update[i] = Playlist._insert({filename: k, loading: true});
    });

    m.request({
      method: 'GET',
      url: '/api/info'+base_path,
      withCredentials: true,
      data: {tracks: files, art: Object.keys(Session.art_cache) }
    })
    .then(data => {
      for (const key of Object.keys(data.art)) {
        Session.art_cache[key] = data.art[key];
      }
      for (let i = 0; i < data.tracks.length; i++) {
        Playlist._update(to_update[i], data.tracks[i]);
      }
    })
    .catch(err => {
      alert(err);
    });
  },
  _insert: (item, pos=Playlist.items.length) => {
    Playlist.items.splice(pos, 0, item);
    return pos;
  },
  _update: (index, item) => {
    if (index < 0 || index >= Playlist.items.length) return;
    Playlist.items[index] = item;
    if (item.track) item.track = parseInt(item.track);
    if (!item.title) item.title = item.filename.substring(item.filename.lastIndexOf('/')+1);
    if (Playlist.current_index < 0 || Playlist.current_index >= Playlist.items.length) {
      Playlist.set(index);
    }
  },
  set: (index=0) => {
    if (index < 0 || index >= Playlist.items.length) return;
    Playlist.current_index = index;
    Playlist.current_item = Playlist.items[Playlist.current_index];
  },
  get: (index=current_index) => {
    if (index < 0 || index >= Playlist.items.length) return null;
    return Playlist.items[index];
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
  },
  select: (index) => {
    Playlist.selected_items[index] = true;
  },
  clearSelection: () => {
    Playlist.selected_items = [];
  }
};


export { Playlist, Session };
