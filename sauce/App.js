'use strict';

import { FullModeView } from './views/FullMode.js';
import { PlayerModeView } from './views/PlayerMode.js';

window.addEventListener('DOMContentLoaded', () => {
  m.route(document.body, '/f/', {
    '/f/:dir_path...': FullModeView,
    '/p/:dir_path...': PlayerModeView
  });
  // Disallow text selection (this is to allow for shift+clicking without selecting ranges of text. Might be better to hook it directly on those elements, if possible?)
  document.onselectstart = () => { return false; };
});

const Title = {
  app_name: 'Musette',
  pre_title: '',
  title_parts: [],
  set: (parts) => {
    Title.title_parts = parts;
    Title.sync();
  },
  setPre: (text) => {
    Title.pre_title = text;
    Title.sync();
  },
  sync: () => {
    document.title
      = (Title.pre_title ? Title.pre_title+' ' : '')
      + Title.title_parts.filter((k) => { if (k) return k; }).join(' - ')
      + (Title.app_name ? ' ∵ ' + Title.app_name : '');
  }
};
Title.sync();

export { Title };
