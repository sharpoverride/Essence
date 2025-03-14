'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var reactify = require('reactify');
var config = require('../config');

gulp.task('example', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: config.scripts.dest + '/essence.js',
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [reactify]
  });

  return b.bundle()
    .pipe(source(config.scripts.dest + '/essence.min.js'))
    .pipe(buffer())
    .on('error', gutil.log)
    .pipe(gulp.dest('./examples/project-template/'));
});
