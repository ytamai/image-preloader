'use strict';
var gulp = require('gulp');
var cached=require('gulp-cached');
var notify=require('gulp-notify');
var plumber=require('gulp-plumber');
var gulpIf =require('gulp-if');
var rename=require('gulp-rename');
var sequence=require('run-sequence');


var browserSync = require('browser-sync');
var reload = browserSync.reload;

var jshint=require('gulp-jshint')


//var concat = require("gulp-concat");
var sequence=require('run-sequence');
var path={
  "src":"src/",
  "build":"build/"
};


function setSrc(s){
  var ignore=[
  '!./node_modules/**',
  '!^_*',
  '!./src/ignore/**',
  '!./src/libs/**',
  '!./src/**/*.map'
  ];
  ignore.push(s);
  return ignore;
}
var src={
  js:setSrc(path.src+'**/*.js'),
  jsx:setSrc(path.src+'**/*.jsx'),
  css:setSrc(path.src+'**/*.css'),
  scss:setSrc(path.src+'**/*.scss'),
  html:setSrc(path.src+'**/*.html'),
  all:setSrc(path.src+'**/*.+(html|css|js)')
};

gulp.task('jshint', function () {
  return gulp.src(src.js)
    .pipe(cached('jshint'))
    .pipe(plumber({
      errorHandler: notify.onError("JSHINT error: <%= error.message %>")
    }))
    .pipe(reload({stream: true, once: true}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpIf(!browserSync.active, jshint.reporter('fail')));
});

gulp.task('default',function(){
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    server: {baseDir:'src'}
  });

  gulp.watch(src.html, reload);
  gulp.watch(src.js, ['jshint']);
});
