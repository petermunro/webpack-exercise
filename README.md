# Webpack Exercise

## Install Webpack

1. Install Webpack:

        npm install webpack -g


## Getting Started

1. The directory `01-simple` contains a simple app which modifies
   an element and prints a message to the console.
   Use Webpack to bundle up the assets (there's only one right now)
   and create a `bundle.js`:
   
        webpack src/js/app.js build/bundle.js

1. Copy the `index.html` over to the build directory, and have it load `bundle.js` instead of `app.js`.

1. Test that it works in a browser.


## Using a Config File

Instead of specifying webpack options via the command line,
place them in a config file.

1. Create the file, `webpack.config.js` with the contents:

	```
	module.exports = {
		entry: /* TODO: path to app.js, starting with './' */ 
		output: {
			filename: /* TODO: destination for generated bundle */
		}
	}
	```

1. Run webpack, this time with no arguments, and check that it has
created the output bundle for you.


## Using webpack-dev-server

While Webpack has a 'watch' mode similar to many other utilities,
a more powerful tool is webpack dev server.

1. Install it:

        npm install webpack-dev-server -g

1. Run it (in the `01-simple` directory):

        webpack-dev-server

1. Now navigate to: <http://localhost:8080/webpack-dev-server/build>
   and you should see your app. Edit your files and ensure that
   the changes are reflected in the browser.

   1. Webpack builds the bundle _in memory_ and serves from there,
      so your `build/bundle.js` will remain untouched.
   1. You can avoid the black top bar by navigating
      to: http://localhost:8080/build/, but you lose live reload.
   1. You can bring live-reload back without the top bar
      with `webpack-dev-server --inline`

## Loading JavaScript modules (CommonJS)

To load CommonJS modules, simply `require()` them from your app (or a module _it_ requires, etc).

1. Add in a separate JavaScript file, `src/js/views/view1.js` which adds
   another (for the moment) `console.log` message.
1. Now `require()` this file from your `app.js`. Remember to
   include the leading './'.


## Loading non-CommonJS JavaScript Files

Webpack starts with the config file you created earlier, and traces all `require()`
statements to load the modules they specify.

To load a file that is not packaged as a CommonJS module,
simply add it to your `webpack.config.js` file:

    	...
    	entry: ['./src/js/app.js', './src/js/lib/jquery-2.2.0.min.js'],
    	...

We've used jQuery purely for example. (jQuery does also test to see
whether it's being `require()`ed, so you can use it in that form too.)


## An Alternate way to load jQuery

Instead of loading jQuery ourselves, we can have Webpack do it.

1. Install jQuery locally using `npm`. Modify your `webpack.config.js`:

	```
	var webpack = require('webpack');
	
	module.exports = {
	
		// ...
	    plugins: [
	        new webpack.ProvidePlugin({
	            $: "jquery",
	            jQuery: "jquery"
	        })
	
	    ]
	    
	    // ...
	}
    ```
    
	This makes the `$` and `jQuery` values available globally, so they're
	accessible within any module without having to do a `require()` within
	each one.

2. Test, and ensure that this places the jQuery source code into your `built/bundle.js`.


## Using a Loader

In this segment we'll add support for Babel, an ES6 to ES5 compiler. It
enables you to use ES6 constructs in browsers that only run ES5.

1. We'll install some modules, but before doing so, we'll create a
`package.json`:

        npm init

  Go ahead and answer the questions.

1. Install the babel loader and babel:

        npm install babel-loader babel-core babel-preset-es2015 babel-preset-react webpack --save-dev

1. Install Babel’s [ES2015 plugin preset](http://babeljs.io/docs/plugins/preset-es2015/):

        npm install babel-preset-es2015 --save-dev


1. Now add to our webpack configuration:

	```
	module.exports = {
	    // ...
		module: {
			loaders: [
				{
					test: /\.es6$/,
					exclude: /node_modules/,
					loader: "babel-loader",
					query: {
						presets: ['es2015']
					}
				}
			]
		},
		resolve: {
			extensions: ['', '.js', '.es6']
		}
		// ...
	};
	```

1. Finally, restart your dev server. Try adding an ES6 construct (eg
`const foo = 'hello';` and ensure that webpack recompiles.


## Static Code Analysis with JSHint

To check our code via JSHint, we'll use a _preloader_ -
a loader that's run before other loaders.

1. Now install `jshint` and `jshint-loader` (via `npm`), using `--save-dev`.

1. JSHint works as a "preloader": it runs _before_ any loaders.
   
```
	// ...
	module: {
		preloaders: [
			{
				test: /\.js$/,
				exclude: [
					/node_modules/,
					/lib/
				],
				loader: 'jshint-loader'
			}
		],
		// ...
```

## Minifying our Code

1. The easiest way to minify:

        webpack -p

   Run this, and check that your bundle has been minified.


## Creating Dev vs Production Builds

1. To create a separate production build, create a new config file
   (eg `webpack-prod.config.js`) and base it off the development build:

	```
	var devConfig = require('./webpack.config.js');
	
	module.exports = devConfig;
	```

1. Install the [`strip-loader`](https://github.com/yahoo/strip-loader) module, and `require()` it in.
   This module removes any 'debug' statements in your code,
   or anything else you want to remove.

1. In your production config, you can add the strip-loader to
   your config. It will work like this:
   
	```
	{
        module: {
            loaders: [
                { test: /\.js$/, loader: "strip-loader?strip[]=debug" }
            ]
        }
    };
    devConfig.module.loaders.push(stripLoader);
	```
    
   Use a similar syntax to remove (say) `console.log` statements.
   
1. Test that your production code no longer has the statements
you've chosen to strip out.


# Minifying a Production Build Automatically

Node and npm use a `NODE_ENV` environment flag to switch between dev
and prod environments. Use this, together with the UglifyJS
plugin.

For example, in your prod config file:

```
var webpack = require('webpack');
var PROD = (process.env.NODE_ENV === 'production');

module.exports = {

	// ...

	output: {
		filename: PROD ? 'bundle.min.js' : 'bundle.js'
	},
	
	// ...
	
	plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
	] : []

};
```

## Packing Stylesheets and Images

To pack stylesheets and images, we `require()` them too:

```
require('./bootstrap.css');
require('./myapp.less');

var img = document.createElement('img');
img.src = require('./glyph.png');
```

The `css-loader` will inline the CSS as a string inside the JS bundle,
having first retrieved any `@import`s, `url()`s or images.

However, we still need a `<style>` element in the page.
The `style-loader` inject a `<style>` element and load the retrieved CSS into it.

1. Install the loaders:

	```
	npm install style-loader css-loader --save-dev
	```

2. Create a simple configuration:

	```
	require("style!css!./mystyles.css")
	```
	
	This means "load ./mystyles.css, then call css-loader on that, then call style-loader on that".

3. Configure Webpack:

	```
	module.exports = {
	
	  // ...
	  
	  module: {
	    loaders: [
	      {
	        test: /\.css$/,
	        loader: 'style-loader!css-loader'
	      }
	    ]
	  }
	};
	```

## Using Sass from Webpack

1. To use Sass, install and configure the `sass-loader`:

	```
	{
		test: /\.sass$/,
		loader: 'style-loader!css-loader!sass-loader'
	}
	```

2. Now ensure that Sass files are compiled accordingly.


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