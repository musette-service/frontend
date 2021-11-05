'use strict'

const Log = function () {
  Log.last = Array.prototype.slice.apply(arguments).join(' ')
  Log.list.splice(0, 0, Log.last)
  if (Log.list.length >= 50) {
    Log.list.splice(Log.list.length - 1, 1)
  }
  console.log(Log.last)
}
Log.last = ''
Log.list = []

export { Log }
