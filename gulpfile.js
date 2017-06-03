var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('default', function() {
  console.log('hi there!');
  browserSync.init({
    server: './'
  });
  browserSync.stream();
});

gulp.task('dist', [
  'copy-html',
  'styles',
  'lint',
  'script-dist'
]);

gulp.task('scripts', function() {
  gulp.src('js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function() {
  gulp.src('sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./css'));
});

gulp.task('copy-images', function() {
  gulp.src('img/*')
      .pipe(gulp.dest('dist/img'));
});