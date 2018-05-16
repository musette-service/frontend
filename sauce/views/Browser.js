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
        m("a.browse-home", {onclick: () => BrowserModel.travel('/')}, 'home'),
        m("a.browse-up", {onclick: () => BrowserModel.travel('../')}, 'up')
      ]),
      m("nav.browser-items", BrowserModel.files.map((file, index) => {
        return m('.browser-item', [
          m('span.browser-item-name', {
            onclick: () => {
              if (file.directory) BrowserModel.travel(file.name);
            }
          }, file.name),
          m('button.browser-item-add', {
            onclick: () => {
              Playlist.insert(BrowserModel.getFilePath(file.name));
            }
          }, '+')
        ]);
      }))
    ]);
  }
};

export { BrowserView };
