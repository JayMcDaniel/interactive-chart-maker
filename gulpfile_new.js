var source = require('vinyl-source-stream')
// var streamify = require('gulp-streamify')
// var browserify = require('browserify')
// var uglify = require('gulp-uglify')
// var gulpify = require('gulpify')
// var rename = require('gulp-rename')
// var gulp = require('gulp')
 
// // using gulpify:
// gulp.task('gulpify', function() {
//   gulp.src('index.js')
//     .pipe(gulpify())
//     .pipe(uglify())
//     .pipe(rename('bundle.js'))
//     .pipe(gulp.dest('./'))
// })
 
// // using vinyl-source-stream:
// gulp.task('browserify', function() {
//   var bundleStream = browserify('./index.js').bundle()
 
//   bundleStream
//     .pipe(source('index.js'))
//     .pipe(streamify(uglify()))
//     .pipe(rename('bundle.js'))
//     .pipe(gulp.dest('./'))
// })