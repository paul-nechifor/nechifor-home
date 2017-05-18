var fs = require('fs');
var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var webserver = require('gulp-webserver');

gulp.task('default', ['build', 'webserver', 'watch']);

gulp.task('build', ['html']);

gulp.task('html', ['style'], function () {
  return gulp.src('index.pug')
  .pipe(pug({locals: {
    css: fs.readFileSync('build-temp/style.css'),
  }}))
  .pipe(gulp.dest('build'));
});

gulp.task('style', function () {
  return gulp.src('style.styl')
  .pipe(stylus({compress: true}))
  .pipe(gulp.dest('build-temp'));
});

gulp.task('webserver', function () {
  var port = parseInt(process.env.port || '8080', 10);
  gulp.src('build')
  .pipe(webserver({livereload: true, open: true, port: port, host: '0.0.0.0'}));
});

gulp.task('watch', function () {
  gulp.watch('index.pug', ['html']);
  gulp.watch('style.styl', ['style']);
});
