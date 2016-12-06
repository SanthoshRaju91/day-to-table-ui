/**
* gulpFile.js
* Gulp task runners for minimizing, concatenating, JS lint, SASS compiler, generating CSS and JS files for production build
* Also, for development we have a browser-sync watcher to aid the development process.
*/

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var wiredep = require('wiredep').stream;
var gsync = require('gulp-sync')(gulp);

var conf = {
  dist: 'dist',
  vendor: 'vendor',
  img: 'img',
  app: {
    html: 'app/**/*.html',
    css: 'app/**/*.css',
    index: 'app/index.html',
    js: 'app/**/*.js'
  }
};

gulp.task('clean', function() {
  del(conf.dist + '/**')
    .then(function() {
      console.info('dist folder cleaned');
    });
});

gulp.task('vendor', function() {
  return gulp.src(conf.vendor + '/**/*.*')
    .pipe(gulp.dest(conf.dist + '/vendor'));
});

gulp.task('img', function() {
  return gulp.src(conf.img + '/**/*.*')
    .pipe(gulp.dest(conf.dist + '/img'));
});

gulp.task('html', function() {
  return gulp.src(conf.app.html)
    .pipe(gulp.dest(conf.dist + '/'));
});

gulp.task('style', function() {
  return gulp.src(conf.app.css)
    .pipe(gulp.dest(conf.dist + '/'));
});

gulp.task('index', function() {

  var source = gulp.src(['./app/**/*.js'], {read: false});
  return gulp.src(conf.app.index)
    .pipe(wiredep())
    .pipe($.inject(source))
    .pipe(gulp.dest(conf.dist + '/'));
});


gulp.task('js', function() {
  return gulp.src(conf.app.js)
    .pipe($.babel({presets: ['es2015']}))
    // .pipe($.jshint())
    // .pipe($.jshint.reporter('default'))
    .pipe($.ngAnnotate())
    .pipe(gulp.dest(conf.dist + '/'));
});


gulp.task('default', gsync.sync(['vendor', 'img', 'html', 'index', 'style', 'js']));
