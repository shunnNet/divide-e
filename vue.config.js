const WorkerPlugin = require('worker-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new WorkerPlugin()
    ]
  },
  css: {
    sourceMap: !process.env.production
  }
}