'use strict';

import { Session } from './Session.js';

function absolute(base, relative) {
  var stack = base.split("/"),
      parts = relative.split("/");
  stack.pop(); // remove current file name (or empty string)
               // (omit if "base" is the current folder without trailing slash)
  for (var i=0; i<parts.length; i++) {
    if (parts[i] == ".")
      continue;
    if (parts[i] == "..")
      stack.pop();
    else
      stack.push(parts[i]);
  }
  return stack.join("/");
}

function pathJoin(parts, sep){
  var separator = sep || '/';
  var replace   = new RegExp(separator+'{1,}', 'g');
  return parts.join(separator).replace(replace, separator);
}

const BrowserModel = {
  files: [],
  current_path: '/',
  travel: (path) => {
    if (path == '/') BrowserModel.current_path = '/';
    let abs_path = absolute('', pathJoin([BrowserModel.current_path, path]));
    m.request({
      method: 'GET',
      url: '/api/browse'+abs_path,
      withCredentials: true
    })
    .then(data => {
      let files = data.filter(obj => !obj.items);
      let dirs  = data.filter(obj => obj.items);

      dirs.sort((a, b) => a.path.localeCompare(b.path));
      files.sort((a, b) => a.path.localeCompare(b.path));

      BrowserModel.current_path = abs_path;
      BrowserModel.files = dirs.concat(files);
      m.route.set("/f"+abs_path);
    })
    .catch(err => {
      alert(err);
    });
  },
  getFilePath: (file) => {
    return absolute('', pathJoin([BrowserModel.current_path, file]));
  }
};

export { BrowserModel };
