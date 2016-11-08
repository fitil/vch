var app = require(__dirname + '/app'),
    port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Hello, World!');
});

app.listen(port, function () {
    console.log('Listening on port ', port);
});
