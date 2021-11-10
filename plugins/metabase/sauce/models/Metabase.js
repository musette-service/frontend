'use strict'
import m from 'mithril'

const MetabaseModel = {
  albums: [],
  selectedAlbums: {},
  init({config, playlist}) {
    MetabaseModel.config = config
    MetabaseModel.playlist = playlist
  },
  async requestAlbums() {
    let results = await m.request({
      method: 'GET',
      url: `${MetabaseModel.config.serverAddress}/api/metabase/albums`,
      withCredentials: true,
    })
    MetabaseModel.albums = results
  },
  async requestAlbumTracks(id) {
    let results = await m.request({
      method: 'GET',
      url: `${MetabaseModel.config.serverAddress}/api/metabase/albums/${id}/tracks`,
      withCredentials: true,
    })
    return results
  },
  getAlbumArtURL(id) {
    return `${MetabaseModel.config.serverAddress}/api/metabase/covers/${id}`
  },
  toggleAlbum(id) {
    if (MetabaseModel.selectedAlbums[id]) {
      MetabaseModel.selectedAlbums[id] = false
    } else {
      MetabaseModel.selectedAlbums[id] = true
    }
  },
  clearSelectedAlbums() {
      MetabaseModel.selectedAlbums = {}
  },
  // Request to musette.
  addTracks(tracks) {
    // This is dumb, but we convert our tracks from ['full/path/track.mp3'] to ['track.mp3'].
    let dir = '/'+tracks[0].substring(0, tracks[0].lastIndexOf('/'))
    tracks = tracks.map(v=>v.substring(dir.length))
    MetabaseModel.playlist.insert(dir, tracks)
  }
}

export { MetabaseModel }
