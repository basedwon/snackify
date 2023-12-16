function isString(input) {
  return typeof input === 'string'
}

function isObject(input) {
  return typeof input === 'object'
}

function isError(input) {
  return input instanceof Error
}

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
  let parsed = { ...options }
  if (args.length === 1) {
    if (isString(args[0])) {
      parsed.msg = args[0]
    } else if (isObject(args[0]) && !(isError(args[0]))) {
      parsed = { ...parsed, ...args[0] }
      if (args[0].message)
        parsed.msg = args[0].message
      if (args[0].ok === false)
        parsed.color = 'error'
    } else if (isError(args[0])) {
      parsed.msg = args[0].message
      parsed.color = 'error'
    }
  } else if (args.length === 2 && isString(args[0]) && isString(args[1])) {
    parsed.msg = args[0]
    parsed.color = args[1]
  }

  return parsed
}
