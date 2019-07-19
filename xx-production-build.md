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

2. In your production config, you can add the strip-loader to
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
