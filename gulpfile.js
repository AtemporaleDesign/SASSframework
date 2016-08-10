// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    compass = require('gulp-compass'),
    path = require('path'),
    mocha = require('gulp-mocha'),
    plugins = require('gulp-load-plugins')();

// compose gulp file and tests project structure
gulp.task('verify_init', require('./test/structure')(gulp, plugins));

// unit sass test
gulp.task('tests', function() {
    gulp.src('test/unit.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));
});




// System var path
var sassDir           = './sass/',
    sassMainFiles     = sassDir+'*.scss',
    sassPageFiles     = sassDir+'smallest/*.scss',
    tempMapDir        = './temp/',
    cssDir            = './dist/css';
    imgDir            = './dist/img';

/*
 |--------------------------------------------------------------------------
 | SASS compile and lint task
 |--------------------------------------------------------------------------
 */
gulp.task('sass', function () {
    gulp.src([sassMainFiles, sassPageFiles])
        .pipe(compass({
            css: tempMapDir,
            sass: sassDir,
            image: imgDir
        }))
        /*.pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())*/
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //.pipe(notify({ message: 'SASS compiled <%= file.relative %>' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest(cssDir))
        .pipe(notify({ message: 'SASS compiled <%= file.relative %>' }));
});

/*
 |--------------------------------------------------------------------------
 | Gulp watch sass
 |--------------------------------------------------------------------------
 */
gulp.task('on', function () {
    gulp.watch(sassDir+'**/*.scss', ['sass']);
});
