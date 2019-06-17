require('dotenv').config()

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/sass/imports.scss";`
      }
    }
  },

  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      definitions[0]['process.env']['PROJECT_ROOT'] = JSON.stringify(process.env.PROJECT_ROOT)
      return definitions
    })
  }
}