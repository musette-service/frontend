import m from 'mithril'
import { PlayerModel } from '../../../models/Player.js'

const VolumeNav = {
  view: vnode => {
    return m('.navbar-item.volume', [
      m('.micon.volume100', {
        onclick: e => {
          if (!vnode.state.volume_click) {
            window.setTimeout(() => {
              window.addEventListener('click', vnode.state.volume_off = e2 => {
                if (e2.target.parentNode === e.target) return
                window.removeEventListener('click', vnode.state.volume_off)
                vnode.state.volume_click = false
                m.redraw()
              })
            }, 0)
            vnode.state.volume_click = true
          }
        }
      }, !vnode.state.volume_click
        ? null
        : m("input[type='range'][orient='vertical'].audio-volume", {
          min: 0,
          max: 100,
          onchange: e => {
            PlayerModel.volume(parseInt(e.target.value) / 100)
          },
          value: parseFloat(PlayerModel.getVolume()) * 100
        })
      )
    ])
  }
}

export { VolumeNav }