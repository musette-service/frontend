import m from 'mithril'
import { Log, Auth } from '../App.js'

const LoginView = {
  oncreate: (vnode) => {
    setTimeout(() => {
      vnode.dom.classList.add('fadein')
    }, 500)
  },
  view: (vnode) => {
    return m('section.container.fadeout', [
      m('section.login', [
        m('img', {
          src: 'img/musette-1024x1024.png'
        }),
        m('div', [
          m('div', 'Access to Musette is restricted to invitation only. Enter your credentials below.')
        ]),
        m('form', {
          onsubmit: e => {
            e.preventDefault()
            Auth.login(e.target.querySelector('.account').value, e.target.querySelector('.password').value)
          }
        }, [
          m('div', [
            m('input.account[type=text][placeholder=Account]')
          ]),
          m('div', [
            m('input.password[type=password][placeholder=Password]')
          ]),
          m('button[type=submit].micon.play')
        ]),
        m('div', Log.last)
      ])
    ])
  },
  onbeforeremove: (vnode) => {
    vnode.dom.classList.remove('fadein')
    return new Promise((resolve) => {
      setTimeout(resolve, 100)
    })
  }
}

export { LoginView }
