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
    bower = require('gulp-bower'),
    plugins = require('gulp-load-plugins')();


// System var path
var sassDir           = './sass/',
    sassMainFiles     = sassDir+'*.scss',
    sassPageFiles     = sassDir+'smallest/*.scss',
    tempMapDir        = './temp/',
    cssDir            = './dist/css',
    imgDir            = './dist/img',
    bowerDir          = './vendor/';

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
        .pipe(autoprefixer({
            browsers: ['last 100 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(tempMapDir))
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

gulp.task('tests', ['sass','init_test','unit_test']);


/*
 |--------------------------------------------------------------------------
 | Bower update plugins task
 |--------------------------------------------------------------------------
 */
gulp.task('bower', function() {
    return bower({directory:bowerDir, cmd:'update'})
});


/*
 |--------------------------------------------------------------------------
 | Tests task
 |--------------------------------------------------------------------------
 */
// compose gulp file and tests project structure
gulp.task('init_test', require('./test/structure')(gulp, plugins));

// unit sass test
gulp.task('unit_test', function() {
    gulp.src('test/unit.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));
});