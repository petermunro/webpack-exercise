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

3. Finally, restart your dev server. It should now compile ES20XX constructs
   into ES5. Try adding a new JavaScript construct and ensure that
	 webpack recompiles.

### Adding Recent or Proposed JavaScript Features

JavaScript is evolving and new features are standardized each year.
To use these, or those not yet standardized, you can add Babel plugins.

1.  Here's one for decorators, which made it into
	 ES2018:

    ```
    import { Bar } from "./views/view3-decorators";

    let bar = new Bar();
    let res = bar.saySomething();
    console.log(res);
    ```

2. To use ES2018 decorators and have them compiled to ES5, first import
   the decorators plugin:

	   npm install @babel/plugin-proposal-decorators --save

3. Now configure Babel by adding a `.babelrc` in the `01-simple` directory:

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

4. Restart webpack dev server and check that it recompiles successfully.
