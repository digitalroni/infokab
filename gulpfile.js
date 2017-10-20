var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require("gulp-rename"),
    cleanCSS = require('gulp-clean-css'),
    concatCss = require('gulp-concat-css'),
    prefixer = require('gulp-autoprefixer'),
   // imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    changed = require('gulp-changed'),
    cache = require('gulp-cached');


// task cached 
gulp.task('lint',function(){
  return gulp.src('js/*.js')
    .pipe(cache('linting'))
    .pipe(jshint())
    .pipe(jshint.reporter())
});


/*/ concat task 
gulp.task('concat', function() {
  return gulp.src('src/js/vendor/*.js')
    .pipe(concat('header.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});
*/

// CHANGED TASK 
var SRC = 'src/js/*.js';
var DEST = 'js';

gulp.task('default', () => {
    return gulp.src(SRC)
        .pipe(changed(DEST))
        .pipe(gulp.dest(DEST));
});

/*/ image task 
gulp.task ('image',function(){
  gulp.src('src/image/kraken/*')
      .pipe(imagemin())
      .pipe(gulp.dest('img'));
});
*/

// script task
gulp.task('scripts',function(){
  return gulp.src('src/js/*.js')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('js'));
});

//style task
gulp.task('styles', function() {
  return gulp.src('src/css/*.css')
    .pipe(prefixer('last 2 versions'))
    .pipe(concatCss('style.css'))
    .pipe(rename({suffix: ".min"}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css'));
});

// html task
gulp.task('html',function(){
  gulp.src('index.html');
});


// Watch task
// watch js
gulp.task('watch',function(){
  gulp.watch('src/js/*.js',['scripts','jshint']);
  gulp.watch('src/css/*.css',['styles']);
  gulp.watch('index.html',['html']);
  gulp.watch('js/*.js',['lint']);
});

// Catch JS errors
gulp.task('jshint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('default',['scripts','watch','styles','html', 'jshint']);