## Adding Static Code Analysis with ESLint

Let's check our code via ESLint, a static code checker for JavaScript.

1. Install `eslint` and `eslint-loader` (via `npm`), using `--save-dev` to add it to our development dependencies:

	   npm install eslint-loader eslint --save-dev

2. To use the ESLint loader, add it to your `webpack.config.js` module `rules`,
   _after_ the `babel-loader` (they apply in bottom-to-top order), as otherwise
	 it will complain about errors in the babel-compiled JS.

	 Add the following lines,

```
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
      }

```

   …so that your config file looks like this:

```
	// ...
  module: {
    rules: [
      {
				// babel-loader config is here
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
      }
    ]
  }
	// ...
```

3. ESLint needs to be configured to tell it which rules to apply. Create a
	 simple `.eslintrc` in the `01-simple` directory, containing:

        {
          "rules": {
            "curly": 2
          }
        }

4. Restart webpack dev server. You should now see a lot of errors for things like:

		Parsing error: The keyword 'import' is reserved

	 This is because Babel is handling the import/exports, and ESLint doesn't know that.
	 To fix it, install `babel-eslint`:

        npm install --save-dev babel-eslint

   Now tell ESLint to use it, by creating a `.eslintrc` (in the `01-simple` directory):

        {
					"parser": "babel-eslint",
          "rules": {
            "curly": 2
          }
        }

   The `2` here tells ESLint to generate an error if you don't use curly braces
   for control constructs (`if` etc).

5. Restart webpack dev server, and you should see the error:

        5:1  error  Expected { after 'if' condition  curly
