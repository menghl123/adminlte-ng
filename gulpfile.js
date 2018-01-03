var gulp = require('gulp');
var os = require('os');
var path = require('path');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var inlineNg2Template = require('gulp-inline-ng2-template');
var runSequence = require('run-sequence').use(gulp);
var exec = require('child_process').exec;
var del = require('del');
var gulpif = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-html-minifier');

var cmpGenConfig = {
  componentSelector: '',
  componentName: '',
};

var config = {
  root: './src',
  src: './src/app/components',
  dest: './dist',
  lib: './lib',
  aot: './aot',
  newCmpTmpl: './build/new-cmp-template'
};

function platformPath(path) {
  return /^win/.test(os.platform()) ? path + '.cmd' : path;
}

gulp.task('clean:dist', function () {
  return del.sync(config.dest, config.aot, config.lib);
});

gulp.task('copy:components', ['clean:dist'], function () {
  return gulp.src([config.src + '/**/*.*'])
    .pipe(gulpif(/.+\.scss/g, sass({outputStyle: 'compressed'}).on('error', sass.logError)))
    .pipe(gulpif(/.+\.css/g, cleanCSS({compatibility: 'ie9'})))
    .pipe(gulpif(/.+\.html/g, htmlmin({
      collapseWhitespace: true,
      caseSensitive: true,
      removeComments: true,
      removeRedundantAttributes: true
    })))
    .pipe(rename(function (path) {
      if (path.extname === '.css') {
        path.extname = '.scss';
      }
    }))
    .pipe(gulp.dest(config.dest));
});

gulp.task('ng2:inline', ['copy:components'], function () {
  return gulp.src([config.dest + '/**/*.ts'])
    .pipe(inlineNg2Template({useRelativePaths: true, target: 'es5'}))
    .pipe(gulp.dest(config.dest + '/'));
});

gulp.task('ng2:aot', ['ng2:inline'], function (cb) {
  var executable = path.join(__dirname, platformPath('/node_modules/.bin/ngc'));
  exec(executable + ' -p ./dist/tsconfig-es2015.json', function (e) {
    if (e) {
      console.error(e);
    }
    del([config.aot, config.dest]);
    cb(e);
  }).stdout.on('data', function (data) {
    console.log(data);
  });
});

gulp.task('prenpm', ['ng2:aot'], function () {
  return gulp.src(['README.md', 'package.json', 'src/app/exports/**/*.d.ts'], {read: true})
    .pipe(gulp.dest(config.lib));
});

gulp.task('prepublish', function (cb) {
  runSequence(['clean:dist', 'ng2:inline', 'ng2:aot', 'prenpm'], cb);
});
