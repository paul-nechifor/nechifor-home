var fs = require('fs');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var pug = require('gulp-pug');
var webserver = require('gulp-webserver');

gulp.task('default', ['html', 'webserver', 'watch']);

gulp.task('html', function () {
  return gulp.src('index.pug')
  .pipe(pug({}))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('dist'));
});

gulp.task('webserver', function () {
  var port = parseInt(process.env.port || '8080', 10);
  gulp.src('dist')
  .pipe(webserver({livereload: true, open: true, port: port, host: '0.0.0.0'}));
});

gulp.task('watch', function () {
  gulp.watch('index.pug', ['html']);
});
