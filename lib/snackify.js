import Vue from 'vue'
import parse from './parse.js'
import Snackify from './Snackify.vue'
import defaultOptions from './defaults.js'

let moduleOptions = JSON.parse(`<%= JSON.stringify(options) %>`)
moduleOptions = { ...moduleOptions.default, ...moduleOptions }
delete moduleOptions.default

/**
 * Nuxt plugin for Snackify, a notification system built on Vuetify's snackbar.
 * It integrates with Nuxt's store to manage and display notifications in a queue.
 *
 * @param {Object} context - The context provided by Nuxt.js for plugins.
 * @param {Function} inject - The method provided by Nuxt.js to inject functions
 *  into the context.
 * 
 * @module
 */
export default (context, inject) => {
  // Vuex module definition for Snackify
  const snackifyModule = {
    namespaced: true,
    state: () => ({
      queue: [],
      active: false,
      ...JSON.parse(JSON.stringify(moduleOptions)),
      // ...moduleOptions,
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
      setNext(state, options) {
        Object.assign(state, options)
      },

      reset(state) {
        Object.assign(state, JSON.parse(JSON.stringify(moduleOptions)))
      },
    },
    actions: {
      /**
       * Displays a notification.
       * @param {Object} context - The Vuex action context.
       * @param {Object} payload - The payload containing notification arguments
       *  and options.
       */
      show({ state, commit, dispatch }, { args, options }) {
        options = options || JSON.parse(JSON.stringify(moduleOptions))
        const parsed = parse({ args, options })
        // log({ options, parsed, moduleOptions, defaultOptions, moduleOptions })
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
        if (!next) return commit('reset')
        commit('remove')
        commit('setNext', next)
        commit('setActive', true)
      },
      /**
       * Manages the transition between notifications.
       * This action is typically used to handle the logic for transitioning 
       * from one notification to the next, including setting appropriate delays.
       * @param {Object} context - The Vuex action context, which includes state,
       *  commit, dispatch, and getters.
       * @param {Object} payload - The payload containing the current (`curr`) 
       *  and previous (`prev`) notification states.
       * @param {boolean} payload.curr - The current state of the notification 
       *  (e.g., active or not).
       * @param {boolean} payload.prev - The previous state of the notification.
       */
      dispatch({ state, commit, dispatch, getters }, { curr, prev }) {
        if (curr && !prev) return
        setTimeout(() => {
          dispatch('next')
        }, 300)
      },

      /**
       * Resets the state of the notification system.
       * This action is used to reset the state to its initial configuration,
       * effectively clearing any active notifications and resetting any 
       * configurations to their default values. It's particularly useful for 
       * clearing the notification queue.
       * @param {Object} context - The Vuex action context, which includes state,
       *  commit, dispatch, and getters.
       */
      reset({ state, commit, dispatch, getters }) {
        commit('reset')
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
  const snackify = (...args) => context.store.dispatch('snackify/show', { args })
  inject('snackify', snackify)
  // Aliased as $snack and $toast for convenience
  inject('snack', snackify)
  inject('toast', snackify)
}
