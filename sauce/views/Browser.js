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
        m('.micon.home', { onclick: () => {
          BrowserModel.travel('/')
          .then(() => {
            document.getElementsByClassName('browser-items')[0].scrollTop = BrowserModel.getScroll();
          });
        } }),
        m('.micon.up', { onclick: () => { 
          BrowserModel.travel('../')
          .then(() => {
            document.getElementsByClassName('browser-items')[0].scrollTop = BrowserModel.getScroll();
          });
        } }),
        m('.micon.add', {
          onclick: () => {
            let targets = [];
            for (let i = 0; i < BrowserModel.checked_files.length; i++) {
              if (BrowserModel.checked_files[i]) {
                targets.push(BrowserModel.files[i].path);
              }
            }
            Playlist.insert(BrowserModel.getFilePath(), targets);
            BrowserModel.clearChecked();
          }, style: 'float:right'
        })
      ]),
      m("nav.browser-items", {
        onscroll: (e) => {
          BrowserModel.setScroll(e.target.scrollTop);
        }
      }, BrowserModel.files.map((file, index) => {
        return m('.browser-item', {
          class: (file.items ? 'directory' : 'file') + (BrowserModel.last_selected == index ? ' selected' : ''),
          onclick: (e) => {
            if (e.shiftKey) {
              if (index > BrowserModel.last_selected) {
                for (let i = BrowserModel.last_selected; i != index+1; i++) {
                  if (i == BrowserModel.last_selected && BrowserModel.isChecked(i)) continue
                  BrowserModel.toggleChecked(i);
                }
              } else {
                for (let i = index; i != BrowserModel.last_selected; i++) {
                  if (i == BrowserModel.last_selected && BrowserModel.isChecked(i)) continue
                  BrowserModel.toggleChecked(i);
                }
              }
            } else {
              if (BrowserModel.last_selected == index) {
                if (file.items) {
                  BrowserModel.travel(file.path)
                  .then(() => {
                    document.getElementsByClassName('browser-items')[0].scrollTop = BrowserModel.getScroll();
                  });
                } else {
                  BrowserModel.toggleChecked(index);
                }
              } else {
                BrowserModel.toggleChecked(index);
              }
            }
            BrowserModel.last_selected = index;
          }
        }, [
          m('.micon.' + (file.items ? 'folder' : 'file.tag'), {
            "data-content": BrowserModel.getFileExt(file.path)
          }),
          m('span.browser-item-name', file.path),
          (file.items
            ? 
            null
            :
            m('.micon.' + (BrowserModel.isChecked(index) ? 'checked' : 'unchecked'), { 
            })
          )
        ]);
      }))
    ]);
  }
};

export { BrowserView };
