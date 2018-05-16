'use strict';

import { PlayerView } from './views/Player.js';

window.addEventListener('DOMContentLoaded', () => {
  m.route(document.body, '/player/', {
    '/player/:dir_path...': PlayerView
  });
});
