# Description

This JQuery plugin implements a starfield constellation on the HTML
canvas. The stars around the mouse cursor are connected with
lines. The amount of stars, the movement of the stars and the length
of the connecting lines can be configuered.

# Building the minified version

With a revent version of npm installed you can create a minified
version of the constellation.js. This is done by

    npm start

with a recent node installation or with docker by

    docker-compose up

On systems with SELinux enforced you might change the file context by
running `chcon -Rt svirt_sandbox_file_t .` in the repository. Then you
find the minified version alongside to the source code in the dist
folder.

# Usage

Simply copy the minified version or the source code to your web space
and include script tags in your HTML. Also you need a canvas tag on
your page. Style your canvas as usual.

The constellation needs to be configured and acitvated as a JQuery
(JQuery needs to be loaded as well) plugin like this:

``` JavaScript
// Init constellation plugin
$('canvas').constellation({
  star: {
    color: '#fff',
    width: 3
  },
    line: {
    color: '#fff'
  },
  radius: 180,
  density: 1280.0 * 640.0 / 200.0
})
```

The constellation.js is based on work by Acauã Montiel.

# Known Bugs

 - If the canvas is in the background (some other containers in front
   of it), the connecting lines do not follow the mouse.

 - Resizing of the window / canvas should be handled to recreate a new
   starfield according to the new size.
