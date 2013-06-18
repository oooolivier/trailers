var express = require('express'),
    path = require('path'),
    http = require('http'),
    trailer = require('./routes/trailers');
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/trailers', trailer.findAll);
app.get('/trailers/:cat', trailer.findByCat);
app.get('/trailers/view/:id', trailer.findById);
app.get('/trailers/edit/:id', trailer.findById);

app.post('/trailers', trailer.addTrailer);
app.put('/trailers/edit/:id', trailer.updateTrailer);

app.delete('/trailers/edit/:id', trailer.deleteTrailer);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Serveur sur port " + app.get('port'));
});