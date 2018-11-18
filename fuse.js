const { FuseBox, WebIndexPlugin, QuantumPlugin, JSONPlugin, ImageBase64Plugin, EnvPlugin, SVGPlugin, TerserPlugin } = require("fuse-box")
const { src, task, context } = require('fuse-box/sparky')
const fs = require('fs-extra')

context(
  class {
    getConfig() {
      return FuseBox.init({
        homeDir: "src",
        output: 'dist/$name.js',
        sourceMaps: true,
        useTypescriptCompiler : true,
        cache: !this.isProduction,
        plugins: [
          JSONPlugin(),
          SVGPlugin(),
          ImageBase64Plugin(),
          EnvPlugin({
            WEBRTC_ADDR: process.env.WEBRTC_ADDR,
            NODE_ENV: this.isProduction ? 'production' : 'development',
          }),
          WebIndexPlugin({
            template: 'src/client/index.html',
            path: this.isProduction
              ? './'
              : '/',
            bundles: this.isProduction
              ? [ 'app' ]
              : [ 'public/vendor', 'public/client' ],
          }),
          this.isProduction && TerserPlugin(),
          this.isProduction && QuantumPlugin({
            processPolyfill: true,
            // replaceProcessEnv: false,
            webIndexPlugin: false,
            treeshake: false,
            bakeApiIntoBundle: true,
          }),
        ],
      })
    }
  }
)

task('server', async context => {
  const fuse = context.getConfig()

  fuse
    .bundle('server')
    .instructions('>[server/index.ts]')
    .target('server')
    .completed(proc => proc.start())

  return fuse.run()
})

task('default', [ 'server' ], async context => {
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

task('clean', () =>
  src('./dist').clean('./dist')
)

task('dist', [ 'clean' ], async context => {
  context.isProduction = true
  fs.copySync('src/client/404.html', 'dist/404.html')

  const fuse = context.getConfig()
  
  fuse
    .bundle('app')
    .instructions('>client/index.tsx')
  
  await fuse.run()
})
