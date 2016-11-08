/**
 * Created by Timo on 24.10.2016.
 */

var gulp = require('gulp');
var runSequence = require('run-sequence');
var merge = require('merge-stream');

var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('./tsconfig.json');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var Builder = require('systemjs-builder');
var appProd = './public/dist/app';
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');

var tsConfig = require('./tsconfig.json');

gulp.task('clean', function () {
    return gulp.src('./public/dist', {read: false})
        .pipe(clean())
});

// Copy assets from public/src
gulp.task('copy:assets', function () {
    return gulp.src(['./public/src/**/*', '!./public/src/**/*.ts', '!./public/src/**/*.less'])
        .pipe(gulp.dest('./public/dist'))
});

gulp.task('copy:dependencies:bootstrap', function () {
    var js = gulp.src('./node_modules/bootstrap/dist/js/*')
        .pipe(gulp.dest('./public/dist/lib/bootstrap/js'));

    var fonts = gulp.src('./node_modules/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('./public/dist/lib/bootstrap/fonts'));

    var css = gulp.src('./node_modules/bootstrap/dist/css/*')
        .pipe(gulp.dest('./public/dist/lib/bootstrap/css'));

    return merge(js, fonts, css);
});

gulp.task('copy:dependencies:jquery', function () {
    return gulp.src('./node_modules/jquery/dist/jquery.js')
        .pipe(gulp.dest('./public/dist/lib/jquery'));
});

gulp.task('copy:dependencies:core-js', function () {
    return gulp.src('./node_modules/core-js/client/shim.js')
        .pipe(gulp.dest('./public/dist/lib/core-js'));
});

gulp.task('copy:dependencies:zone-js', function () {
    return gulp.src('./node_modules/zone.js/dist/zone.js')
        .pipe(gulp.dest('./public/dist/lib/zone-js'));
});

gulp.task('copy:dependencies:reflect', function () {
    return gulp.src('./node_modules/reflect-metadata/Reflect.js')
        .pipe(gulp.dest('./public/dist/lib/reflect'));
});

gulp.task('copy:dependencies:systemjs', function () {
    return gulp.src('./node_modules/systemjs/dist/system.js')
        .pipe(gulp.dest('./public/dist/lib/systemjs'));
});

gulp.task('copy:dependencies:angular2', function () {
    return gulp.src('./node_modules/@angular/**/bundles/*.umd.js')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./public/dist/lib/@angular'))
});

gulp.task('copy:dependencies:rxjs', function () {
    return gulp.src(['./node_modules/rxjs/**/*.js', '!./node_modules/rxjs/node_modules/**/*'])
        .pipe(gulp.dest('./public/dist/lib/rxjs'))
});

gulp.task('copy:dependencies', [
    'copy:dependencies:bootstrap',
    'copy:dependencies:jquery',
    'copy:dependencies:core-js',
    'copy:dependencies:zone-js',
    'copy:dependencies:reflect',
    'copy:dependencies:systemjs',
    'copy:dependencies:angular2',
    'copy:dependencies:rxjs'
]);

gulp.task('compile:ts', function () {
    return tsProject.src('./public/src/app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/dist/app'));
});

gulp.task('minify:js', function () {
    return gulp.src(['./public/dist/**/*.js', '!./public/dist/**/*.min.js'])
        .pipe(uglify()
            .on('error', function (err) {
                console.error('Cannot uglify the following file: ' + err.fileName);
                throw err;
            })
        )
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/dist'))
});

gulp.task('minify:css', function () {
    return gulp.src(['./public/dist/**/*.css', '!./public/dist/**/*.min.css'])
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/dist'))
});

gulp.task('minify:html', function () {
    return gulp.src('./public/dist/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            caseSensitive: true
        }))
        .pipe(gulp.dest('./public/dist'))
});

gulp.task('minify', ['minify:js', 'minify:css']);

gulp.task('bundle', function () {
    var builder = new Builder('./public/dist', './public/dist/systemjs.config.js');
    return builder
        .buildStatic(appProd + '/main.js', appProd + '/bundle.min.js', {minify: true, sourceMaps: true})
        .then(function () {
            console.log('Build complete');
        })
        .catch(function (err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('replace:html:prod', function () {
    gulp.src('./public/dist/index.html')
        .pipe(
            inject(
                gulp.src([
                    './public/dist/lib/bootstrap/css/bootstrap.min.css',
                    './public/dist/css/**/*.min.css',
                    './public/dist/lib/jquery/**/*.min.js',
                    './public/dist/lib/bootstrap/js/bootstrap.min.js',
                    './public/dist/lib/core-js/**/*.min.js',
                    './public/dist/lib/zone-js/**/*.min.js',
                    './public/dist/lib/reflect/**/*.min.js',
                    './public/dist/lib/systemjs/**/*.min.js',
                    './public/dist/app/bundle.min.js',
                ], {read: false}),
                {
                    relative: true
                }
            )
        )
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('replace:html:dev', function () {
    gulp.src('./public/dist/index.html')
        .pipe(
            inject(
                gulp.src([
                    './public/dist/lib/bootstrap/css/bootstrap.css',
                    './public/dist/css/**/*.css',
                    './public/dist/lib/jquery/**/*.js',
                    './public/dist/lib/bootstrap/js/bootstrap.js',
                    './public/dist/lib/core-js/**/*.js',
                    './public/dist/lib/zone-js/**/*.js',
                    './public/dist/lib/reflect/**/*.js',
                    './public/dist/lib/systemjs/**/*.js',
                    './public/dist/systemjs.config.js',
                    './public/dist/start.js',
                    '!./public/dist/**/*.min.js'
                ], {read: false}),
                {
                    relative: true
                }
            )
        )
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('dev', function (callback) {
   runSequence('clean', 'copy:assets', 'copy:dependencies', 'compile:ts', 'replace:html:dev', callback)
});

gulp.task('build', function (callback) {
    runSequence('clean', 'copy:assets', 'copy:dependencies', 'compile:ts', 'bundle', 'minify', 'replace:html:prod', 'minify:html', callback);
});