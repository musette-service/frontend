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
            for (let i = 0; i < BrowserModel.selected_files.length; i++) {
              if (BrowserModel.selected_files[i]) {
                Playlist.insert(BrowserModel.getFilePath(BrowserModel.files[i].path));
              }
            }
            BrowserModel.clearSelected();
          }, class: 'plus', style: 'float:right'
        })
      ]),
      m("nav.browser-items", BrowserModel.files.map((file, index) => {
        return m('.browser-item', {
          class: file.items ? 'directory' : 'file'
        }, [
          m(BytesizeIcon, { class: file.items ? 'folder' : 'music' }),
          m('span.browser-item-name', {
            onclick: () => {
              if (file.items) BrowserModel.travel(file.path);
              else BrowserModel.toggleSelection(index);
            },
          },
          file.path),
          m(BytesizeIcon, { 
            class: BrowserModel.isSelected(index) ? 'checkmark' : file.items ? 'plus' : '',
            onclick: () => { BrowserModel.toggleSelection(index) }
          })
        ]);
      }))
    ]);
  }
};

export { BrowserView };
