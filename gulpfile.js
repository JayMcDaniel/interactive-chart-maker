'use strict';

var gulp = require("gulp"); //build skeleton
var gutil = require("gulp-util"); //console util
var source = require("vinyl-source-stream"); // helps with transfering files
var babelify = require("babelify"); //converts from es6 to es5
var browserify = require("browserify"); //keeps build/concat order straight with requires
var watchify = require("watchify"); //tool that watches src for changes and auto runs gulpfile
//var reactify = require("reactify"); //tool that changes jsx to js
var streamify = require('gulp-streamify'); //glue
var uglify = require('gulp-uglify'); //minimizes
var sass = require('gulp-sass'); //converts sass to css



gulp.task('sass', function () {

    gulp.src('./styles/sass/*.scss')
        .pipe(sass.sync({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./styles/css'));
});


gulp.task('sass:watch', function () {
    gulp.watch('./styles/sass/*.scss', ['sass']);
});




gulp.task("default", ['sass', 'sass:watch'], function () {
    var bundler = watchify(
        browserify({
            entries: ["./scripts_src/app.js"],
            // transform: [reactify],
            extensions: ['.jsx', '.js'],
            debug: true,
            cache: {},
            packageCache: {},
            fullPaths: false
        })
        .transform("babelify", {
            presets: ["es2015"]
        })
    );

    function build(file) {
        if (file) {
            gutil.log("Recompiling " + file);
        }

        return bundler
            .bundle()
            .on("error", function (err) {
                if (err && err.codeFrame) {
                    gutil.log(
                        gutil.colors.red("Browserify error: "),
                        gutil.colors.cyan(err.filename) + ` [${err.loc.line},${err.loc.column}]`,
                        "\r\n" + err.message + "\r\n" + err.codeFrame);
                } else {
                    gutil.log(err);
                }
                this.emit("end");
            })

        .pipe(source("scripts_build/main.min.js"))
            // .pipe(streamify(uglify()))
            .pipe(gulp.dest("./"));
    };
    build();
    bundler.on("update", build);


});