import { Log, App, isMobile } from '../App.js';

const SplashView = {
  view: (vnode) => {
    return m('.splash.fadein', [
      m('img.fadeout', {
        src: 'img/musette-1024x1024.png',
        onload: (e) => {
          Log("Requesting server API...");
          e.target.classList.add("fadein");
          m.request({
            method: "GET",
            url: "/api/",
            withCredentials: true
          })
          .then(result => {
            Log("Received server API!");
            if (isMobile()) {
              m.route.set("/p/", {}, { replace: true });
            } else {
              m.route.set("/f/", {}, { replace: true });
            }
          })
          .catch(App.handleRequestError);
        }
      })
    ], Log.last);
  },
  onbeforeremove: (vnode) => {
    vnode.dom.classList.add("fadeout");
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }
};

export { SplashView };
