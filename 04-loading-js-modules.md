## Loading JavaScript modules (ES2015)

Webpack loads ES2015 modules out of the box. To load a JS module, simply `import`
it in your code.

1. Examine the files `src/js/views/view1.js` and `src/js/views/view2.js`.

2. Now edit `app.js` to `import` the named export from `./views/view1`:

				import { aSecondMessage } from "./views/view1";

3. Finally append code to `app.js` to use and display this value:

				let message2 = document.getElementById("message2");
				message2.innerHTML = aSecondMessage;

4. Ensure that your changes are reflected in the browser.
