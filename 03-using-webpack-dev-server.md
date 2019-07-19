## Using webpack-dev-server

While webpack has a 'watch' mode similar to many other utilities,
a more powerful tool is _webpack dev server_.

1. Install it:

        npm install webpack-dev-server --save-dev

2. Add the following lines to your `webpack.config.js`:

				devServer: {
					contentBase: "./dist"
				}

3. Run it (in the `01-simple` directory):

        npx webpack-dev-server

4. Now navigate to: <http://localhost:8080/>
   and you should see your app.
	 
5. Edit `src/js/app.js` to change the message and ensure that
   your changes are reflected in the browser.

   > Webpack builds the bundle _in memory_ and serves everything from there,
     so your `dist/bundle.js` will remain untouched.
