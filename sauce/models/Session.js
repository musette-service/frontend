'use strict';

const Session = {
  set: (key, value, is_default) => {
    if (typeof key === 'object') {
      is_default = value;
      value = key;
      key = '';
    }
    Session._set(key, value, is_default);
  },
  get: (key="") => {
    return Session._get(key);
  },
  has: (key) => {
    if (Session.get(key)) return true;
    else return false;
  },
  _storage: JSON.parse(localStorage.getItem("data")) || {},
  _getStoragePath: (key = "", create_path = false) => {
    if (key == "") return { obj: Session._storage, element: '' }
    let hierarchy = key.match(/([^\\\.]|\\.)+/g);
    let last_obj = null;
    let last_name = '';
    let obj = Session._storage;
    for (let i = 0; i < hierarchy.length; i++) {
      last_obj = obj;
      last_name = hierarchy[i];
      if (i != hierarchy.length) {
        if (obj[hierarchy[i]] === undefined) {
          if (!create_path) {
            return {obj: null, element: null}
          } else {
            obj[hierarchy[i]] = {};
          }
        }
        obj = obj[hierarchy[i]];
      }
    }
    return {obj: last_obj, element: last_name}
  },
  _set: (key, value, is_default = false) => {
    if (typeof key === 'object') {
      is_default = value;
      value = key;
      key = '';
    }
    let {obj, element} = Session._getStoragePath(key, true);
    if (element == '') {
      if (typeof value === 'object') {
        Session._storage = is_default ? Object.assign(value, Session._storage) : Object.assign(Session._storage, value);
      } else {
        // Throw away value if attempting to overwrite storage with string
      }
    } else {
      if (Array.isArray(value)) {
        if (!is_default) obj[element] = value;
      } else if (typeof value === 'object') {
        if (!obj[element]) obj[element] = {};
        if (is_default) {
          obj[element] = Object.assign(value, obj[element]);
        } else {
          obj[element] = Object.assign(obj[element], value);
        }
      } else {
        obj[element] = is_default ? obj[element] === undefined ? value : obj[element] : value;
      }
    }
  },
  _get: (key="") => {
    let {obj, element} = Session._getStoragePath(key, false);
    if (obj == null || element == null) return null;
    return obj[element];
  }
};
window.addEventListener('unload', () => {
  localStorage.setItem("data", JSON.stringify(Session._storage));
});
Session.set("playlist", {}, true);

const Playlist = {
  current_index: -1,
  current_item: '',
  art_cache: {},
  items: Session.get('playlist.items') || [],
  selected_items: [],
  checked_items: [],
  last_selected: -1,
  insert: (base_path, files, pos=Playlist.items.length) => {
    if (!Array.isArray(files)) files = [files];

    let to_update = [];
    files.forEach((k, i) => {
      to_update[i] = Playlist._insert({filename: k, loading: true});
    });

    m.request({
      method: 'GET',
      url: '/api/info'+encodeURIComponent(base_path),
      withCredentials: true,
      params: {tracks: files, art: Object.keys(Playlist.art_cache) }
    })
    .then(data => {
      for (const key of Object.keys(data.art)) {
        Playlist.art_cache[key] = data.art[key];
      }
      for (let i = 0; i < data.tracks.length; i++) {
        Playlist._update(to_update[i], data.tracks[i]);
      }
      Session.set('playlist.items', Playlist.items);
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
  removeItem: index => {
    if (index < 0 || index >= Playlist.items.length) return false;
    Playlist.items.splice(index, 1);
    Playlist.checked_items.splice(index, 1);
    return true;
  },
  select: (index) => {
    Playlist.selected_items[index] = true;
  },
  clearSelection: () => {
    Playlist.selected_items = [];
  },
  isSelected: index => {
    return Playlist.selected_items[index] ? true : false;
  },
  isChecked: index => {
    return Playlist.checked_items[index] ? true : false;
  },
  toggleChecked: index => {
    if (index < 0 || index >= Playlist.items.length) return;
    Playlist.checked_items[index] = Playlist.checked_items[index] == true ? false : true;
  },
  check: index => {
    if (index < 0 || index >= Playlist.items.length) return;
    Playlist.checked_items[index] = true;
  },
  processChecked: type => {
    if (type == 'remove') {
      for (let i = 0; i <= Playlist.checked_items.length; i++) {
        if (Playlist.checked_items[i] == true) {
          if (Playlist.removeItem(i)) {
            i--;
          }
        }
      }
    }
  }
};

export { Playlist, Session };
