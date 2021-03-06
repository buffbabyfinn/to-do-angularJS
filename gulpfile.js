var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});
// var browserify = require('browserify');
// var source = require('vinyl-source-stream');
// var jshint = require('gulp-jshint');
// var moment = require('moment');
// var browserSync = require('browser-sync').create();
var utilities = require('gulp-util');
var buildProduction = utilities.env.production;
var del = require('del');

//setup server, with watchers, run ts compiler
var browserSync = require('browser-sync').create();
var shell = require('gulp-shell');

//sass
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

//typescript
gulp.task('tsClean', function(){
  return del(['app/*.js', 'app/*.js.map']);
});

gulp.task('ts', ['tsClean'], shell.task(['tsc']));


////////////////////// BOWER //////////////////////
// when adding a new bower depndency:
// stop the server
// always use the `bower install --save` flag.
// run `gulp bower` to build vendor files
// restart server.

gulp.task('jsBowerClean', function(){
  return del(['./build/js/vendor.min.js']);
});

gulp.task('jsBower', ['jsBowerClean'], function() {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('cssBowerClean', function(){
  return del(['./build/css/vendor.css']);
});

gulp.task('cssBower', ['cssBowerClean'], function() {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['jsBower', 'cssBower']);

////////////////////// SASS //////////////////////

gulp.task('sassBuild', function() {
  return gulp.src('resources/styles/*')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

////////////////////// SERVER //////////////////////

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(['resources/js/*.js'], ['jsBuild']); // vanilla js changes, reload.
  gulp.watch(['*.html'], ['htmlBuild']); // html changes, reload.
  gulp.watch(['resources/styles/*.css', 'resources/styles/*.scss'], ['cssBuild']); // css or sass changes, concatenate all css/sass, build, reload.
  gulp.watch(['app/*.ts'], ['tsBuild']); // typescript files change, compile then reload.
});

gulp.task('jsBuild', function(){
  browserSync.reload();
});

gulp.task('htmlBuild', function(){
  browserSync.reload();
});

gulp.task('cssBuild', ['sassBuild'], function(){
  browserSync.reload();
});

gulp.task('tsBuild', ['ts'], function(){
  browserSync.reload();
});

////////////////////// GLOBAL BUILD TASK //////////////////////

// global build task with individual clean tasks as dependencies.
gulp.task('build', ['ts'], function(){
  // we can use the buildProduction environment variable here later.
  gulp.start('bower');
  gulp.start('sassBuild');
});

////////////////////// SETUP NOTES //////////////////////

/*
- clone repo
- npm install
- bower install
- install globals if needed (gulp, bower, sass, typescript, typescript packages.)
  - npm install gulp -g
  - npm install bower -g
  - gem install sass
  - npm install typescript -g
  - apm install atom-typescript
- gulp build
- gulp serve
*/

//old stuff!!!


// gulp.task('concatInterface', function(){
//   return gulp.src(['./js/*-interface.js'])
//     .pipe(concat('allConcat.js'))
//     .pipe(gulp.dest('./tmp'));
// });
//
// gulp.task('jsBrowserify', ['concatInterface'] , function(){
//   return browserify({ entries: ['./tmp/allConcat.js'] })
//     .bundle()
//     .pipe(source('app.js'))
//     .pipe(gulp.dest('./build/js'));
// });
//
// gulp.task('minifyScripts', ['jsBrowserify'], function(){
//   return gulp.src('./build/js/app.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('./build/js'))
// });
//


// gulp.task('clean', function(){
//   return del(['build', 'tmp']);
// });
//
// gulp.task('build', ['clean'], function(){
//   if(buildProduction) {
//     gulp.start('minifyScripts');
//   } else {
//     gulp.start('jsBrowserify');
//   }
//   gulp.start('bower');
//   gulp.start('cssBuild');
// });
//
// gulp.task('jshint', function(){
//   return gulp.src(['js/*.js'])
//   .pipe(jshint())
//   .pipe(jshint.reporter('default'));
// });
//
// gulp.task('bowerJS', function () {
//   return gulp.src(lib.ext('js').files)
//     .pipe(concat('vendor.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('./build/js'));
// });
//
// gulp.task('bowerCSS', function () {
//   return gulp.src(lib.ext('css').files)
//     .pipe(concat('vendor.css'))
//     .pipe(gulp.dest('./build/css'));
// });
//
// gulp.task('bower', ['bowerJS', 'bowerCSS', 'cssBuild']);
//
// gulp.task('serve', function() {
//   browserSync.init({
//     server: {
//       baseDir: "./",
//       index: "index.html"
//     }
//   });
//   // gulp.watch(['js/*.js'], ['jsBuild']);
//   gulp.watch(['bower.json'], ['bowerBuild']);
//   gulp.watch(['*.html'], ['htmlBuild']);
//   gulp.watch("scss/*.scss", ['cssBuild']);
// });
//
// gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
//   browserSync.reload();
// });
//
// gulp.task('bowerBuild', ['bower'], function(){
//   browserSync.reload();
// });
//
// gulp.task('htmlBuild', function() {
//   browserSync.reload();
// });
//
// gulp.task('cssBuild', function() {
//   return gulp.src('scss/*.scss')
//     .pipe(sourcemaps.init())
//     .pipe(sass())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('./build/css'))
//     .pipe(browserSync.stream());
// });
//
// gulp.task('default', ['build']);
