// Community Stop
// ==============
// Main server startup script
// for the application.

var express = require('express'),
    app     = express(),
    exphbs  = require('express-handlebars'),
    request = require('superagent'),
    xml2js  = require()


// Configure the app here
// ----------------------
app.engine('hbs', exphbs({
  defaultLayout: 'default',
  extname: '.hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


// Set up any middleware here
// --------------------------
app.use(express.static(__dirname + '/public'));

// Implement routes here
// ---------------------

// GET /
// -----
// Render the homepage
app.get('/?', function(req, res, next) {
  res.render('home', {
    myName: 'Shawn'
  });
});


// GET /busses/
// ------------
// Get data from bus tracker website
// Call this route from your main JS file
// on the front end. It'll be an AJAX call.
app.get('/busses/?', function(req, res, next) {
  // Use the `request` object (Superagent: https://github.com/visionmedia/superagent)
  // to make an API call to CTA to get the data you want
  request
    .get('/cta/api/CHANGE_THIS/TO/WHATEVER/')
    .end(function(err, response) {
      // you get the CTA response in here
      // Now parse it into JSON from XML
      if (err) {
        res.json({status: 'error', message: err});
      } else {
        xml2js(response.body, function(error, result) {
          if (error) {
            console.log(error); // there are better ways to handle errors but whatever
          } else {
            res.json(result);
          }
        })
      }
    })
})

// Start the server
// ----------------
var server = app.listen(process.env.PORT, function() {
  console.log('Server is running at http://localhost:' + server.address().port);
});
