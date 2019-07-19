## Creating a separate CSS Bundle

For some applications, you may prefer a separate CSS file instead of a single app bundle.
This will enable the browser to load the CSS in parallel with the JS,
and to be cached in the browser.

1. Install the `extract-text-webpack-plugin`.

2. Read the documentation for this plugin to
   see how to:

    1. `require()` it in your config file
    1. configure it

3. Check in your browser devtools that the CSS is downloaded as a separate
   bundle.