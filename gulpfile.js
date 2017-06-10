var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'lint', 'scripts'], function() {
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('js/**/*.js', ['lint']);
  gulp.watch('/index.html', ['copy-html']);
  gulp.watch('./dist/index.html').on('change', browserSync.reload);

  browserSync.init({
    server: './dist'
  });
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

gulp.task('copy-html', function() {
  gulp.src('./index.html')
      .pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function() {
  gulp.src('img/*')
      .pipe(gulp.dest('dist/img'));
});

gulp.task('lint', function() {
  return gulp.src(['js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('tests', function() {
  gulp.src('tests/spec/extraSpec.js')
      .pipe(jasmine({
          integration: true,
          vendor: 'js/**/*.js'
      }));
});