## Packing Stylesheets and Images

To pack stylesheets and images, we `import` them, just as we do with JavaScript
modules.

To do this, we have webpack bundle everything up into a JS file!

The `css-loader` takes the CSS as a string, and "inlines" it as a JS string
inside the JS bundle, having first retrieved any `@import`s, `url()`s or images
it refers to.

Having CSS in our JS bundle is a start, but when the app loads in the browser,
we still need a `<style>` element somewhere to load it into so that the browser
understands it as a stylesheet.

To do this, once the app loads in the browser, the `style-loader` injects a
`<style>` element into the page and loads the CSS from the JS bundle into it.

1. Install the loaders:

	```
	npm install style-loader css-loader --save-dev
	```

2. Configure Webpack:

    ```
    // ...
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    }
    ```

3. Restart webpack-dev-server.

4. Import the CSS file into a JS file (for example, `app.js`):

        import "../css/styles.css";

  Check that the page renders with a background color.