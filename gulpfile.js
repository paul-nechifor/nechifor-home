var fs = require('fs');
var gulp = require('gulp');
var pug = require('gulp-pug');
var webserver = require('gulp-webserver');

gulp.task('default', ['html', 'webserver', 'watch']);

gulp.task('html', function () {
  return gulp.src('index.pug')
  .pipe(pug({}))
  .pipe(gulp.dest('build'));
});

gulp.task('webserver', function () {
  var port = parseInt(process.env.port || '8080', 10);
  gulp.src('build')
  .pipe(webserver({livereload: true, open: true, port: port, host: '0.0.0.0'}));
});

gulp.task('watch', function () {
  gulp.watch('index.pug', ['html']);
});
