const path = require('path')
const withPlugins = require('next-compose-plugins')
const withStyles = require('@webdeb/next-styles')
const withTM = require('next-transpile-modules')(['jarallax', 'video-worker', 'locomotive-scroll'])

module.exports = withPlugins([withStyles, withTM],{
  sass: true,
  sassLoaderOptions: {
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    },
  },
  publicRuntimeConfig: {
    apiUrl: process.env.WP_API_URL,
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    })

    return config
  }
})