// server.js
// BASE SETUP
/**
 * apidoc -i routes/ -o apidoc/ 
 * 
 */
// =============================================================================
// call the packages we need
var express = require('express');        // call express
var path = require('path');        // call express
var fs = require('fs');        // call express
var app = express();                 // define our app using express
var http = require('http').createServer(app);



var port = process.env.PORT || 3009;        // set our port
app.use(express.static(path.join(__dirname, '.')));


app.get('/', function (req, res) {
    fs.readFile('./index.html', 'utf-8', (error, content) => {
        //     res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
    });
});



http.listen(port, () => {
    console.log('server running on  ' + port);
});









