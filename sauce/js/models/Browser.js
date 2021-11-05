'use strict'

import m from 'mithril'
import { Config } from './Config.js'
import { App } from '../App.js'

function absolute (base, relative) {
  const stack = base.split('/')
  const parts = relative.split('/')
  stack.pop() // remove current file name (or empty string)
  // (omit if "base" is the current folder without trailing slash)
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '.') { continue }
    if (parts[i] === '..') { stack.pop() } else { stack.push(parts[i]) }
  }
  return stack.join('/')
}

function pathJoin (parts, sep) {
  const separator = sep || '/'
  const replace = new RegExp(separator + '{1,}', 'g')
  return parts.join(separator).replace(replace, separator)
}

const BrowserModel = {
  files: [],
  checked_files: [],
  last_selected: -1,
  current_path: '/',
  scroll_stack: [],
  travel: (path) => {
    return new Promise((resolve, reject) => {
      if (path === '/') BrowserModel.current_path = '/'
      const abs_path = absolute('', pathJoin([BrowserModel.current_path, path]))
      m.request({
        method: 'GET',
        url: `${Config.serverAddress}/api/browse${encodeURIComponent(abs_path)}`,
        withCredentials: true
      })
        .then(data => {
          const files = data.filter(obj => !obj.items)
          const dirs = data.filter(obj => obj.items)

          dirs.sort((a, b) => a.path.localeCompare(b.path))
          files.sort((a, b) => a.path.localeCompare(b.path))

          BrowserModel.current_path = abs_path
          BrowserModel.files = dirs.concat(files)
          BrowserModel.clearChecked()
          if (path === '../' && abs_path !== '') {
            BrowserModel.scroll_stack.pop()
          } else {
            BrowserModel.scroll_stack.push(0)
          }
          // m.route.set("/f"+abs_path);
          resolve()
        })
        .catch(err => {
          App.handleRequestError(err)
          reject(err)
        })
    })
  },
  getFileExt: (file) => {
    const ext = file.lastIndexOf('.')
    if (!ext) return ''
    return file.substring(ext + 1).toLowerCase()
  },
  getFilePath: (file) => {
    return absolute('', pathJoin([BrowserModel.current_path, file]))
  },
  clearChecked: () => {
    BrowserModel.checked_files = []
  },
  toggleChecked: (index) => {
    if (index < 0 || index >= BrowserModel.files.length) return
    BrowserModel.checked_files[index] = !BrowserModel.checked_files[index]
  },
  isChecked: (index) => {
    if (index < 0 || index >= BrowserModel.checked_files.length) return false
    return !!BrowserModel.checked_files[index]
  },
  setScroll: (scroll) => {
    BrowserModel.scroll_stack[BrowserModel.scroll_stack.length - 1] = scroll
  },
  getScroll: () => {
    return BrowserModel.scroll_stack[BrowserModel.scroll_stack.length - 1]
  }
}

export { BrowserModel }
