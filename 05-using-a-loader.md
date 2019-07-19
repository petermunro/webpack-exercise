## Using a Loader

In this segment we'll add support for Babel, an ES20xx to ES5 compiler. It
enables you to use the latest JavaScript constructs in browsers that only run ES5.

1. Install the babel loader and babel (assuming webpack 4.x, babel-loader 8.x and babel 7.x):

        npm install babel-loader @babel/core @babel/preset-env webpack --save-dev

2. Now add to our webpack configuration:

	```
	module.exports = {
	    // ...
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env']
							}
						}
					}
				]
			}
		// ...
	};
	```

3. Finally, restart your dev server. Try adding a new JavaScript construct and
	 ensure that webpack recompiles. Here's one for decorators, which made it into
	 ES2018:

    ```
    import { Bar } from "./views/view3-decorators";

    let bar = new Bar();
    let res = bar.saySomething();
    console.log(res);
    ```

4. If you get an error from Babel about decorator syntax, you may need to
    configure it by placing a `.babelrc` in the `01-simple` directory:

    ```
    {
      "plugins": [
        [
          "@babel/plugin-proposal-decorators",
          {
            "decoratorsBeforeExport": false
          }
        ]
      ]
    }
    ```
