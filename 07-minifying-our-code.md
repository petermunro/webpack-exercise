## Minifying our Code

"Minifying" makes our code take up the smallest space possible.
Smaller code to send across the wire means smaller download times.

It does this by stripping out comments, spaces, shortening variable
names to a single character, and so on.

1. The easiest way to minify:

        webpack -p

   Run this, and check that your bundle has been minified.
