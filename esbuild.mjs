import esbuild from 'esbuild'

import copyPlugin from 'esbuild-plugin-globcopy'

const args = process.argv.slice(2)

const config = {
   entryPoints: ['sauce/js/App.js'],
   bundle: true,
   outdir: 'dist',
   plugins: [
       copyPlugin({
           srcdir: 'sauce',
           targets: ['css/**', 'fonts/**', 'img/**', 'favicon.ico', 'index.html']
       })
   ],
}

async function build() {
    await esbuild.build({
        ...config,
        watch: args.includes('--watch'),
    })
}

async function serve() {
    const server = await esbuild.serve({
        servedir: 'dist',
    }, {
        ...config,
        watch: args.includes('--watch'),
    })
    console.log('blep', server)
    //server.stop()
}

if (args.length == 0 || args[0].startsWith('--') || args[0] === 'build') {
    build()
} else if (args[0] === 'serve') {
    serve()
}