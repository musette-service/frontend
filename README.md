# Musette Frontend
Herein lies in-progress code for the client frontend for Musette, the remote music player.

## Using
This software is intended to be served by the `musette-server` package. At some point this should not be necessary (once musette-client can specify the end-point server to access), but at the moment is expected.

Per default -- and for development purposes -- the contents of this directory can simply be used as `musette-server`'s webroot. However, as can be noted by the presence of webpack and node configuration files, a production version can be used to ease up on bandwidth usage as well as to increase browser compatibility. The steps to generate and use the production version is as follows.

  1. Run `npm run build`
  2. Modify the App.*.js script lines in `index.html` to be as follows:

    <script src="js/App.bundle.js"></script>
    <!-- <script type="module" src="sauce/App.js"></script> -->

Once these changes are made, musette-client will use a minified bundle of all the individual ES6 modules stored in the `sauce/` directory.
