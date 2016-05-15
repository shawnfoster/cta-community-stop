// Gulpfile
// ========
// Development and deployment task
// definitions.

'use strict';

// Set the environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Require all dependencies
var gulp = require('gulp'),
    gls = require('gulp-live-server'),
    less = require('gulp-less');


// Set environment variables
const exec = require('child_process').exec;
// Set environment variables
gulp.task('setvars', function() {
  exec('source envvars.sh', function(err, stdout, stderr) {
    if (err) {
      console.log(err);
    } else if (stderr) {
      console.log('Environment error: ' + stderr)
    } else {
      console.log(stdout);
    }
  });
});

// Server
// ------
// Starts a local Express
// server.
gulp.task('server', function() {
  // write code to start the server here.
  let server = gls('./src/app.js', { env: {
    HANDLEBARS: {
      defaultLayout: 'default',
      extname: '.hbs',
      layoutsDir: __dirname + '/src/views/layouts',
      partialsDir: __dirname + '/src/views/partials'
    }
  } });
  server.start();

  // Relaod the server on change
  gulp.watch(['./gulpfile.js', './src/app.js'], function() {
    server.start.bind(server)()
  });
});


// LESS
// ----
// A taak to transpile LESS to CSS
gulp.task('less', function(){
  return gulp.src('./src/public/less/bootstrap.less')
    .pipe(less()) // Using gulp-less
    .pipe(gulp.dest('./src/public/css'))
})


// jsHint
// ------
// Checks for good JS code style and
// reports on (potential) errors in code
// before they're found at runtime.


// Watch
// -----
// Watches files and runs appropriate
// tasks on them when they change
gulp.task('watch', function(){
  gulp.watch('./src/public/less/**/*.less', ['less']);
  // Other watchers
});


// Default task
// ------------
// The default task watches all LESS,
// JS, and other files then starts a local
// server up.
// gulp.task('default', ['setvars', 'watch', 'server']);
gulp.task('default', ['setvars', 'watch', 'server']);
