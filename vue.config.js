const WorkerPlugin = require('worker-plugin');

module.exports = {
  publicPath: "/divide-e/dist",
  configureWebpack: {
    plugins: [
      new WorkerPlugin()
    ]
  },
  css: {
    sourceMap: !process.env.production
  }
}