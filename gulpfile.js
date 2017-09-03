// including plugins
var gulp = require('gulp');
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var color = require('gulp-color');
var del = require('del');

var jsFile = './app/**/*.js';

// task
gulp.task('minify-js', function () {
    console.log(color('****Starting to minify*****','BLUE'));
    gulp.src(jsFile) // path to your files
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/dist'));
});

gulp.task('jshint', function() {
  return gulp.src(jsFile)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function() {
    console.log(color('****Cleaning the dist folder*****','YELLOW'));
    return del(['dist/*.js']);
});