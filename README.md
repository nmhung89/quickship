# Quick Ship

Quick Ship is a web application for users to post their shipping demand and show it for other people which are standing near the place then they can help to ship that item and earn money. This is ... not a serious project because I create it mainly to learn [ReactJS] and [ExpressJS]

### Feature
  - Post a shipping request including description, from location, to location, image, price, phone number to contact.
  - List shipping requests with above information + map to show the path and current user's position.
  - A button beside each shipping request listing to mark it's shipped.

### Tech
* [ReactJS] - a JS lib for building interface
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Grunt] - the JS task runner
* [BrowserSync] - time-saving synchronised browser testing
* [Bower] - package manager for the web

### Development
You need to have nodejs and npm (package manager for nodejs) installed in advance, it's quite easy, just google it.
To run project for development:
```sh
$ npm install
$ bower install
$ node server/app.js    # nodemon server/app.js for monitoring changes and restart the server
$ grunt                 # run it in a different terminal
```
To install nodemon:
```sh
$ npm install -g nodemon
```

License
----

MIT


[//]: #
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [ReactJS]: <https://facebook.github.io/react/index.html>
   [ExpressJS]: <http://expressjs.com/>
   [Grunt]: <http://gruntjs.com/>
   [Bower]: <http://bower.io/>
   [BrowserSync]: <https://www.browsersync.io/>
