'use strict';

import { Playlist } from '../models/Session.js';
import { BrowserModel } from '../models/Browser.js';
import { BytesizeIcon } from './BytesizeIcon.js';

const BrowserView = {
  oncreate: (vnode) => {
  },
  oninit: vnode => { BrowserModel.travel(vnode.attrs.dir_path) },
  view: vnode => {
    return m("section.browser", [
      m("section.browser-controls", [
        m(BytesizeIcon, { onclick: () => { BrowserModel.travel('/'); }, class: 'home' }),
        m(BytesizeIcon, { onclick: () => { BrowserModel.travel('../') }, class: 'chevron-top'}),
        m(BytesizeIcon, {
          onclick: () => {
            let targets = [];
            for (let i = 0; i < BrowserModel.checked_files.length; i++) {
              if (BrowserModel.checked_files[i]) {
                targets.push(BrowserModel.files[i].path);
              }
            }
            Playlist.insert(BrowserModel.getFilePath(), targets);
            BrowserModel.clearChecked();
          }, class: 'plus', style: 'float:right'
        })
      ]),
      m("nav.browser-items", BrowserModel.files.map((file, index) => {
        return m('.browser-item', {
          class: (file.items ? 'directory' : 'file') + (BrowserModel.last_selected == index ? ' selected' : '')
        }, [
          m(BytesizeIcon, { class: file.items ? 'folder' : 'music' }),
          m('span.browser-item-name', {
            onclick: (e) => {
              if (e.shiftKey) {
                const start   = Math.min(BrowserModel.last_selected, index);
                const end     = Math.max(BrowserModel.last_selected, index) + 1;
                for (let i = start; i != end; i++) {
                  BrowserModel.toggleChecked(i);
                }
              } else {
                if (BrowserModel.last_selected == index) {
                  if (file.items) BrowserModel.travel(file.path);
                  else BrowserModel.toggleChecked(index);
                }
                BrowserModel.last_selected = index;
              }
            },
          },
          file.path),
          m(BytesizeIcon, { 
            class: BrowserModel.isChecked(index) ? 'checkmark' : file.items ? 'plus' : '',
            onclick: () => { BrowserModel.toggleChecked(index) }
          })
        ]);
      }))
    ]);
  }
};

export { BrowserView };
