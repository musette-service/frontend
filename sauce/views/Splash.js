const SplashView = {
  view: (vnode) => {
    return m('.splash', [
      m('img.fadeout', {
        src: 'img/musette-1024x1024.png',
        onload: (e) => {
          e.target.classList.add("fadein");
          setTimeout(() => {
            m.route.set("/f/", {}, { replace: true });
          }, 500);
        }
      })
    ]);
  },
  onbeforeremove: (vnode) => {
    vnode.dom.classList.add("fadeout");
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }
};

export { SplashView };
