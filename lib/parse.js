import defaultOptions from './defaults.js'

/**
 * Parses the arguments passed to the Snackify notification function.
 * 
 * @param {Object} params - The parameters object.
 * @param {Array} params.args - The arguments passed to the snackify function.
 * @param {Object} params.options - The options for customizing the snackify notification.
 * @returns {Object} The parsed configuration object for the notification.
 *
 * @description
 * This function takes in a set of arguments and options and parses them into a single
 * configuration object. If an error object is passed, it extracts the message and sets
 * the color to 'error'. If an object is passed, it merges it with the default options.
 * If a string is passed, it's considered as the message. If two arguments are passed,
 * the first is treated as the message and the second as the color.
 * @module
 */
export default ({ args, options }) => {
  let parsed = { ...defaultOptions, ...options }

  // If the first argument is an object and not an Error, merge it with the default options
  if (args.length === 1 && typeof args[0] === 'object' && !(args[0] instanceof Error)) {
    parsed = { ...parsed, ...args[0] }
    if (args[0].message)
      parsed.msg = args[0].message
    if (args[0].ok === false)
      parsed.color = 'error'
  } else if (args.length === 1 && args[0] instanceof Error) {
    // If the first argument is an error, use its message and set color to 'error'
    parsed.msg = args[0].message
    parsed.color = 'error'
  } else if (args.length > 1) {
    // If there are multiple arguments, the first is the message and the second is the color
    parsed.msg = args[0]
    parsed.color = args[1]
  } else if (args.length === 1 && typeof args[0] === 'string') {
    // If there's only one argument and it's a string, it's the message
    parsed.msg = args[0]
  }

  return parsed
}
