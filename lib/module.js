// Snackify - module.js
const { resolve, join } = require('path')
const defaultOptions = require('./defaults')

/**
 * Nuxt module for Snackify integration.
 * This module sets up Snackify as a plugin in a Nuxt.js application and ensures
 * Vuetify is present as a dependency.
 *
 * @module
 * @param {Object} moduleOptions - Configuration options for the Snackify module.
 * @throws Will throw an error if Vuetify is not installed or configured.
 */
export default function(moduleOptions) {
  // Check if Vuetify is present in buildModules or modules
  const isVuetifyModulePresent = this.options.buildModules.includes('@nuxtjs/vuetify') ||
                                 this.options.modules.includes('@nuxtjs/vuetify')
  // Throw an error if Vuetify is not installed
  if (!isVuetifyModulePresent) {
    throw new Error(
      'Snackify requires Vuetify to be installed and configured in nuxt.config.js. ' +
      'Please install Vuetify using `npm install @nuxtjs/vuetify` and add it to the ' +
      'buildModules or modules section of your Nuxt configuration.'
    )
  }

  // Merge default and provided options
  const options = {
    ...defaultOptions,
    ...moduleOptions,
    ...this.options.snackify,
  }

  // Add Snackify plugin to the project
  this.addPlugin({
    src: resolve(__dirname, 'snackify.js'),
    fileName: join('snackify', 'snackify.js'),
    options
  })

  // Add Snackify component template to the project
  this.addTemplate({
    src: resolve(__dirname, 'Snackify.vue'),
    fileName: join('snackify', 'Snackify.vue'),
    options,
  })

  // Add default options as a template
  this.addTemplate({
    src: resolve(__dirname, 'defaults.js'),
    fileName: join('snackify', 'defaults.js'),
    options,
  })

  // Add parser function as a template
  this.addTemplate({
    src: resolve(__dirname, 'parse.js'),
    fileName: join('snackify', 'parse.js'),
    options,
  })
}

// Export the module's meta data
module.exports.meta = require('../package.json')
