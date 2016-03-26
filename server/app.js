var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var orm = require('orm');
var mysql = require('mysql');

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(orm.express("mysql://root:@localhost/quickship", {
    define: function (db, models, next) {
        models.shipping = db.define("shipping", {
            id: {type: 'serial', key: true},
            title: {type: 'text'},
            from: {type: 'text'},
            to: {type: 'text'},
            phone: {type: 'text'},
            budget: {type: 'text'},
            timestamp: {type: 'number'},
            data: Object // JSON encoded
        });
        next();
        db.sync();
    }
}));

app.post('/api/post-shipping-request/', function (req, res) {
    var shipping = {};
    shipping.title = req.body.title;
    shipping.from = req.body.from;
    shipping.to = req.body.to;
    shipping.phone = req.body.phone;
    shipping.budget = req.body.budget;
    shipping.timestamp = Date.now();
    req.models.shipping.create(shipping, function (err, result) {
        res.send(result);
    });
});

app.get('/api/list-shipping-request/', function(req, res) {
    req.models.shipping.find({}, {order: '-timestamp'}, function(err, results) {
        res.send(results);
    });
});

app.delete('/api/remove-shipping-request/', function(req, res) {
    req.models.shipping.find({ id: req.body.shipId }).remove(function (err) {
    });
    res.send('Success');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/index.html');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

io.on('connection', function (socket) {
    socket.on('PostNewShipping', function (shipping) {
        io.emit('NewShipping', shipping);
    });
});
