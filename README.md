# Quick Ship

Quick Ship is a social interaction web application designed to connect people who are in need of delivering items quickly and economically with local people who are free and want to earn money by providing fast delivering services. This is ... not a serious project because I create it mainly to learn [ReactJS] and [ExpressJS]

### Feature
  - Post a shipping request including title, from-location, to-location, price, phone number to contact.
  - List shipping requests with above information + map to show the path.
  - A button beside each shipping request listing to mark it's shipped.
  - Auto update new shipping list in real time.

### Tech
* [ReactJS] - a JS lib for building interface
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Node-orm] - orm for node.js
* [SocketIO] - real-time engine
* [Grunt] - the JS task runner
* [BrowserSync] - time-saving synchronised browser testing
* [Bower] - package manager for the web

### Development
You need to have nodejs and npm (package manager for nodejs) installed in advance, it's quite easy, just google it.
To run project for development:

1. Update database user/password in server/app.js
2. Create database `quickship`
3. Run following commands
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
4. Check it at http://localhost:3001

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
   [Node-orm]: <https://github.com/dresende/node-orm2>
   [SocketIO]: <http://socket.io/>
