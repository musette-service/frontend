'use strict';

import { SplashView } from './views/Splash.js';
import { LoginView } from './views/Login.js';
import { FullModeView } from './views/FullMode.js';
import { PlayerModeView } from './views/PlayerMode.js';
import { BrowserModeView } from './views/BrowserMode.js';

window.addEventListener('DOMContentLoaded', () => {
  m.route(document.body, '/splash', {
    '/splash': SplashView,
    '/l': LoginView,
    '/f/:dir_path...': FullModeView,
    '/p/:dir_path...': PlayerModeView,
    '/b/:dir_path...': BrowserModeView
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

let Log = function() {
  Log.last = Array.prototype.slice.apply(arguments).join(' ');
  Log.list.splice(0, 0, Log.last);
  if (Log.list.length >= 50) {
    Log.list.splice(Log.list.length-1, 1);
  }
  console.log(Log.last);
};
Log.last = '';
Log.list = [];

let _isMobile = null;
function isMobile() {
  if (_isMobile == null) {
		if (/Mobi/i.test(navigator.userAgent) == true || /Android/i.test(navigator.userAgent) == true ) {
      _isMobile = true;
    }
    
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection && connection.type === 'cellular') {
      _isMobile = true;
    }
  
    _isMobile = false;
  }
  return _isMobile;
}

const Auth = {
  login: (username, password) => {
    m.request({
      method: "POST",
      data: {
        username: username,
        password: password
      },
      url: "/api/auth/login", 
      withCredentials: true
    })
    .then(result => {
      m.route.set("/splash/", {}, { replace: true });
    })
    .catch(e => {
      Log(e.message);
      console.dir(e);
    });
  }
};

const App = {
  handleRequestError: error => {
    if (error.status == 401) { // Login request
      Log("Login required.");
      m.route.set("/l/", {}, { replace: true });
    } else {
      Log(error.status+": " + error.message)
    }
  }
};

export { Title, Log, Auth, isMobile, App };
