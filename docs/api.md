## Modules

<dl>
<dt><a href="#module_defaults">defaults</a> : <code>Object</code></dt>
<dd><p>Default configuration options for Snackify module.</p>
</dd>
<dt><a href="#module_module">module</a></dt>
<dd><p>Nuxt module for Snackify integration.
This module sets up Snackify as a plugin in a Nuxt.js application and ensures
Vuetify is present as a dependency.</p>
</dd>
<dt><a href="#module_parse">parse</a> ⇒ <code>Object</code></dt>
<dd><p>This function takes in a set of arguments and options and parses them into a single
configuration object. If an error object is passed, it extracts the message and sets
the color to &#39;error&#39;. If an object is passed, it merges it with the default options.
If a string is passed, it&#39;s considered as the message. If two arguments are passed,
the first is treated as the message and the second as the color.</p>
</dd>
<dt><a href="#module_snackify">snackify</a></dt>
<dd><p>Nuxt plugin for Snackify, a notification system built on Vuetify&#39;s snackbar.
It integrates with Nuxt&#39;s store to manage and display notifications in a queue.</p>
</dd>
</dl>

<a name="module_defaults"></a>

## defaults : <code>Object</code>
Default configuration options for Snackify module.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | The default message to be displayed in the snackbar. |
| icon | <code>boolean</code> | Determines if an icon should be shown in the snackbar. |
| color | <code>string</code> | The theme color applied to the snackbar for styling. |
| class | <code>string</code> | Additional classes to apply to the snackbar for custom styling. |
| style | <code>string</code> | Inline styles to apply to the snackbar. |
| timeout | <code>number</code> | The duration in milliseconds for which the snackbar is visible. |
| top | <code>string</code> | If set, displays the snackbar at the top of the screen with the specified value. |
| bottom | <code>string</code> | If set, displays the snackbar at the bottom of the screen with the specified value. |
| left | <code>string</code> | If set, aligns the snackbar to the left side of the screen with the specified value. |
| right | <code>string</code> | If set, aligns the snackbar to the right side of the screen with the specified value. |

<a name="module_module"></a>

## module
Nuxt module for Snackify integration.
This module sets up Snackify as a plugin in a Nuxt.js application and ensures
Vuetify is present as a dependency.

**Throws**:

- Will throw an error if Vuetify is not installed or configured.


| Param | Type | Description |
| --- | --- | --- |
| moduleOptions | <code>Object</code> | Configuration options for the Snackify module. |

<a name="module_parse"></a>

## parse ⇒ <code>Object</code>
This function takes in a set of arguments and options and parses them into a single
configuration object. If an error object is passed, it extracts the message and sets
the color to 'error'. If an object is passed, it merges it with the default options.
If a string is passed, it's considered as the message. If two arguments are passed,
the first is treated as the message and the second as the color.

**Returns**: <code>Object</code> - The parsed configuration object for the notification.  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | The parameters object. |
| params.args | <code>Array</code> | The arguments passed to the snackify function. |
| params.options | <code>Object</code> | The options for customizing the snackify notification. |

<a name="module_snackify"></a>

## snackify
Nuxt plugin for Snackify, a notification system built on Vuetify's snackbar.
It integrates with Nuxt's store to manage and display notifications in a queue.


| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | The context provided by Nuxt.js for plugins. |
| inject | <code>function</code> | The method provided by Nuxt.js to inject functions  into the context. |

