## Using a Config File

Previously you specified webpack options on the command line,
but it's normally better to place them in a config file.

1. Create the file `webpack.config.js` in the `01-simple` directory, with
	 the following contents, and fill in the blanks:

	```
	module.exports = {
		entry: /* TODO: path to app.js, starting with './' */ 
		output: {
			filename: /* TODO: generated bundle filename (automatically placed in dist/) */
		}
	}
	```

	Compare these values to the command line you executed previously.

2. Remove the previously-generated `dist/bundle.js` file.

3. Run webpack, this time with no arguments, and check that it has
	 re-created the output `dist/bundle.js` file for you.

4. Again, verify that you can see the "Welcome to Webpack!" output in a web browser.
