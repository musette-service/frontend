'use strict';

import { FullModeView } from './views/FullMode.js';
import { PlayerModeView } from './views/PlayerMode.js';

window.addEventListener('DOMContentLoaded', () => {
  m.route(document.body, '/f/', {
    '/f/:dir_path...': FullModeView,
    '/p/:dir_path...': PlayerModeView
  });
});

const Title = {
  app_name: 'Musette',
  last_pre_title: '',
  pre_title: '',
  last_title: '',
  title: '',
  set: (text) => {
    Title.last_title = Title.title;
    Title.title = text;
    Title.sync();
  },
  setPre: (text) => {
    Title.last_pre_title = Title.pre_title;
    Title.pre_title = text;
    Title.sync();
  },
  sync: () => {
    document.title
      = (Title.pre_title ? Title.pre_title+' ' : '')
      + (Title.title ? Title.title+' ' : '')
      + (Title.app_name ? '∵ ' + Title.app_name : '');
  }
};
Title.sync();

export { Title };
