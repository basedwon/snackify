# Snackify

> A Vuetify snackbar for Nuxt

[![npm](https://img.shields.io/npm/v/snackify?style=flat&logo=npm)](https://www.npmjs.com/package/snackify)
[![pipeline](https://gitlab.com/frenware/utils/snackify/badges/master/pipeline.svg)](https://gitlab.com/frenware/utils/snackify/-/pipelines)
[![license](https://img.shields.io/npm/l/snackify)](https://gitlab.com/frenware/utils/snackify/-/blob/master/LICENSE)
[![downloads](https://img.shields.io/npm/dw/snackify)](https://www.npmjs.com/package/snackify) 

[![Gitlab](https://img.shields.io/badge/Gitlab%20-%20?logo=gitlab&color=%23383a40)](https://gitlab.com/frenware/utils/snackify)
[![Github](https://img.shields.io/badge/Github%20-%20?logo=github&color=%23383a40)](https://github.com/basedwon/snackify)
[![Twitter](https://img.shields.io/badge/@basdwon%20-%20?logo=twitter&color=%23383a40)](https://twitter.com/basdwon)
[![Discord](https://img.shields.io/badge/Basedwon%20-%20?logo=discord&color=%23383a40)](https://discordapp.com/users/basedwon)

Snackify is a lightweight and versatile Nuxt module that leverages Vuetify to display snackbars (toasts) on your app or website. With a focus on ease of use and flexibility, Snackify offers a wide array of customizable options, allowing developers to create notifications that feel native to their app's design.

## Features

- Easy integration with Nuxt and Vuetify
- Vuex store integrated for state management
- Customizable through module options
- Queue system for displaying multiple snackbars in sequence

## Installation

```bash
npm install snackify
# OR
yarn add snackify
```

## Usage

First, make sure you have Vuetify installed and configured with Nuxt. Then, add `snackify` to your `nuxt.config.js` file:

```js
export default {
  // ... other configuration
  buildModules: [
    // ... other build modules
    'snackify',
  ],
  snackify: {
    // ... your custom options
  },
}
```

## Documentation

- [API Reference](/docs/api.md)

### Options

You can pass options to `snackify` through the `snackify` property in your `nuxt.config.js` file. The following options are available:

```js
export default {
  snackify: {
    msg: 'Your default message',
    color: 'success',
    icon: true,
    timeout: 3000,
    top: true,
    // ... other default options
  }
}
```

### Default Options

When using Snackify, the following default options are provided out of the box. You can override these by providing your own settings:

| Option   | Type    | Default   | Description                                                                                                      |
|----------|---------|-----------|------------------------------------------------------------------------------------------------------------------|
| `msg`    | String  | 'Success!'| The message text that appears in the snackbar.                                                                   |
| `icon`   | Boolean | `true`    | Controls the visibility of the icon in the snackbar. If `true`, an icon is displayed.                            |
| `color`  | String  | 'success' | Applies a color theme to the snackbar. The default is 'success', which typically styles the snackbar in green.   |
| `class`  | String  | 'pb-6'    | A class that can be used to add custom styling to the snackbar, `pb-6` adds padding-bottom of 6 units.           |
| `style`  | String  | ''        | Any inline styles you want to apply directly to the snackbar component.                                          |
| `timeout`| Number  | 2000      | The duration in milliseconds that the snackbar will remain visible before automatically closing.                 |
| `top`    | String  | null      | If set, the snackbar will appear at the top of the viewport. The value should be a valid CSS property.          |
| `bottom` | String  | null      | If set, the snackbar will appear at the bottom of the viewport. The value should be a valid CSS property.       |
| `left`   | String  | null      | If set, the snackbar will align to the left of the viewport. The value should be a valid CSS property.          |
| `right`  | String  | null      | If set, the snackbar will align to the right of the viewport. The value should be a valid CSS property.         |

### Methods

To display a snackbar, use the `$snackify` method injected into the Vue instance:

```js
this.$snackify('This is a message', 'error')
```

You can also pass an object to customize the snackbar further:

```js
this.$snackify({ msg: 'Hello World', color: 'info', timeout: 5000 })
```

## Tests

In order to run the test suite, simply clone the repository and install its dependencies:

```sh
git clone https://github.com/basedwon/snackify.git
cd snackify
npm install
```

To run the tests:

```sh
npm test
```

## Contributing

Thank you! Please see our [contributing guidelines](/docs/contributing.md) for details.

## Donations

If you find this project useful and want to help support further development, please send us some coin. We greatly appreciate any and all contributions. Thank you!

**Bitcoin (BTC):**
```
1JUb1yNFH6wjGekRUW6Dfgyg4J4h6wKKdF
```

**Monero (XMR):**
```
46uV2fMZT3EWkBrGUgszJCcbqFqEvqrB4bZBJwsbx7yA8e2WBakXzJSUK8aqT4GoqERzbg4oKT2SiPeCgjzVH6VpSQ5y7KQ
```

## License

snackify is [MIT licensed](https://gitlab.com/frenware/utils/snackify/-/blob/master/LICENSE).

