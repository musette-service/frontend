'use strict';

import { Playlist } from '../models/Session.js';
import { BrowserModel } from '../models/Browser.js';

const BrowserView = {
  oncreate: (vnode) => {
  },
  oninit: vnode => { BrowserModel.travel(vnode.attrs.dir_path) },
  view: vnode => {
    return m("section.browser", [
      m("section.browser-controls", [
        m("button.browse-home", {onclick: () => BrowserModel.travel('/')}, 'home'),
        m("button.browse-up", {onclick: () => BrowserModel.travel('../')}, 'up')
      ]),
      m("nav.browser-items", BrowserModel.files.map((file, index) => {
        return m('.browser-item', {
          class: file.items ? 'directory' : 'file'
        }, [
          m('span.browser-item-name', {
            onclick: () => {
              if (file.items) BrowserModel.travel(file.path);
              else Playlist.insert(BrowserModel.getFilePath(file.path));
            }
          }, file.path),
          file.items ?  m('button.browser-item-add', '+') : null
        ]);
      }))
    ]);
  }
};

export { BrowserView };
