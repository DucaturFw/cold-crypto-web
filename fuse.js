const { FuseBox, WebIndexPlugin, QuantumPlugin, JSONPlugin, ImageBase64Plugin, EnvPlugin, SVGPlugin } = require("fuse-box")
const { src, task, context } = require('fuse-box/sparky')

context(
  class {
    getConfig() {
      return FuseBox.init({
        homeDir: "src",
        output: 'dist/$name.js',
        sourceMaps: true,
        useTypescriptCompiler : true,
        plugins: [
          JSONPlugin(),
          SVGPlugin(),
          ImageBase64Plugin(),
          EnvPlugin({WEBRTC_ADDR: process.env.WEBRTC_ADDR}),
          WebIndexPlugin({
            template: "src/client/index.html",
            bundles: [ 'public/vendor', 'public/client' ],
          }),
          this.isProduction &&
            QuantumPlugin({
              css: true,
              uglify: true
            })
        ],
      })
    }
  }
)

task('default', async context => {
  const fuse = context.getConfig()

  fuse
    .dev({ fallback: 'index.html' })

  fuse
    .bundle('public/vendor')
    .instructions("~client/index.tsx")
    .target('browser')

  fuse
    .bundle("public/client")
    .instructions(">[client/index.tsx]")
    .target('browser')
    .hmr()
    .watch()

  await fuse.run()
})

task('server', async context => {
  const fuse = context.getConfig()

  fuse
    .bundle('server')
    .instructions('>[server/index.ts]')
    .target('server@es2017')
    .hmr()
    .completed((proc) => {
      proc.require({
        close: ({ FuseBox }) => FuseBox.import(FuseBox.mainFile).shutdown()
      })
    })

  return fuse.run()
})


task('clean', () =>
  src('./dist').clean('./dist')
)

task('dist', [ 'clean', 'server' ], async context => {
  context.isProduction = true
  const fuse = context.getConfig()
  
  fuse
    .bundle('app')
    .instructions('>client/index.tsx')
  
  await fuse.run()
})
