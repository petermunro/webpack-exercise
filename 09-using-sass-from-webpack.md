## Using Sass from Webpack

[Sass](https://sass-lang.com) is a CSS compiler that adds some syntactic sugar to CSS.

1. To use Sass with webpack, install and configure the `sass-loader`:

        npm install sass-loader node-sass webpack --save-dev

2. Now configure it:

	```
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
	```

3. And now test it to ensure that Sass files are compiled properly:

        import "../css/morestyles.scss";
