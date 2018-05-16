import { Session } from '../models/Session.js';

const ControllerView = {
  view: () => {
    return m("section.controller", [
      m("audio.audio-player", { controls: true }, [
        m("source", {src: ""})
      ])
    ]);
  }
};

export { ControllerView };
