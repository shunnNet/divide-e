const WorkerPlugin = require('worker-plugin');

module.exports = {
  publicPath: "/dist",
  configureWebpack: {
    plugins: [
      new WorkerPlugin()
    ]
  },
  css: {
    sourceMap: !process.env.production
  }
}