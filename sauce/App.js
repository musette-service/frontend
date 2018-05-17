'use strict';

import { FullModeView } from './views/FullMode.js';
import { PlayerModeView } from './views/PlayerMode.js';

window.addEventListener('DOMContentLoaded', () => {
  m.route(document.body, '/f/', {
    '/f/:dir_path...': FullModeView,
    '/p/:dir_path...': PlayerModeView
  });
});
