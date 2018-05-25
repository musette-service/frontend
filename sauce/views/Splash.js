const SplashView = {
  view: (vnode) => {
    return m('.splash', [
      m('img.fadeout', {
        src: 'img/musette-512x512.png',
        onload: (e) => {
          e.target.classList.add("fadein");
          setTimeout(() => {
            m.route.set("/f/", {}, { replace: true });
          }, 1000);
        }
      })
    ]);
  },
  onbeforeremove: (vnode) => {
    vnode.dom.classList.add("fadeout");
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
};

export { SplashView };
