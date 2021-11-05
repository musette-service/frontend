# Musette Frontend
Herein lies in-progress code for the client frontend for Musette, the remote music player.

## Using
This software is intended to either be served by the `musette-server` package or by a standalone HTTP server. For the former, point the server's `web_root` value to either the `sauce` directory or the `dist` directory after building the client software.

## Building
Various npm scripts are provided that allow build, watch, and serve options.

To bundle the client frontend, issue `npm run build`. This bundles to the `dist` directory.

To bundle the client frontend and watch for any changes, issue `npm run watch`. This bundles to the `dist` directory.

Finally, to run a local development server, issue `npm run serve`. This bundles to the `dist` directory and serves javascript from memory.

## Installing
If desired, the client files can be installed in a system directory. This is generally only done if the [server](https://github.com/kettek/musette-server) is also being installed. On *nix, this is most easily done by using the GNU Makefile in the scripts directory. To install, first build the client with `make -f scripts/Makefile`, and then issue `make -f scripts/Makefile install`. This will, if $PREFIX is not provided as an environment variable, install to `/usr/local/share/musette/client`.

Uninstallation can be done by issuing `make -f scripts/Makefile uninstall`.
