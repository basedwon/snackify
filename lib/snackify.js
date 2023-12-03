import Vue from 'vue'
import parse from './parse.js'
import Snackify from './Snackify.vue'
import defaultOptions from './defaults.js'

const moduleOptions = JSON.parse(`<%= JSON.stringify(options) %>`)

/**
 * Nuxt plugin for Snackify, a notification system built on Vuetify's snackbar.
 * It integrates with Nuxt's store to manage and display notifications in a queue.
 *
 * @param {Object} context - The context provided by Nuxt.js for plugins.
 * @param {Function} inject - The method provided by Nuxt.js to inject functions into the context.
 * 
 * @module
 */
export default (context, inject) => {
  // Merge all available options with precedence given to moduleOptions
  const options = {
    ...defaultOptions,
    ...context.$config.snackify,
    ...moduleOptions,
  }

  // Vuex module definition for Snackify
  const snackifyModule = {
    namespaced: true,
    state: () => ({
      queue: [],
      active: false,
      // State properties derived from merged options
      ...options,
    }),
    mutations: {
      /**
       * Sets the active state of the snackbar.
       * @param {Object} state - The Vuex state object.
       * @param {boolean} payload - The new active state.
       */
      setActive(state, payload) {
        state.active = payload
      },
      /**
       * Inserts a new item into the notification queue.
       * @param {Object} state - The Vuex state object.
       * @param {Object} item - The notification item to be inserted.
       */
      insert(state, item) {
        state.queue.push(item)
      },
      /**
       * Removes the first item from the notification queue.
       * @param {Object} state - The Vuex state object.
       */
      remove(state) {
        state.queue.shift()
      },
      /**
       * Sets the next notification item as the active one.
       * @param {Object} state - The Vuex state object.
       * @param {Object} opts - The notification options.
       */
      setNext(state, opts) {
        Object.assign(state, opts, options)
      },
    },
    actions: {
      /**
       * Displays a notification.
       * @param {Object} context - The Vuex action context.
       * @param {Object} payload - The payload containing notification arguments and options.
       */
      show({ state, commit, dispatch }, { args, options }) {
        const parsed = parse({ args, options })
        commit('insert', parsed)
        if (parsed.log)
          console.log('Snackify:', parsed)
        if (state.active) return
        dispatch('next')
      },
      /**
       * Displays the next notification in the queue if available.
       * @param {Object} context - The Vuex action context.
       */
      next({ state, commit, dispatch, getters }) {
        const next = getters.peek
        if (!next) return
        commit('remove')
        commit('setNext', next)
        commit('setActive', true)
      },
    },
    getters: {
      /**
       * Returns the first item in the notification queue.
       * @param {Object} state - The Vuex state object.
       * @returns {Object|null} The next notification item or null.
       */
      peek: state => state.queue[0] || null,
      /**
       * Returns the current notification options.
       * @param {Object} state - The Vuex state object.
       * @returns {Object} The current notification options.
       */
      options: state => ({
        ...state,
      }),
    },
  }

  // Register Snackify component globally
  Vue.component('Snackify', Snackify)

  // Register the Snackify Vuex module
  context.store.registerModule('snackify', snackifyModule, { preserveState: false })

  // Inject the snackify function into the Nuxt context
  const snackify = (...args) => context.store.dispatch('snackify/show', { args, options })
  inject('snackify', snackify)
  // Aliased as $snack for convenience
  inject('snack', snackify)
}
