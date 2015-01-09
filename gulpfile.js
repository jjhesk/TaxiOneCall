var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jshintReporter = require('jshint-stylish'),
    nodemon = require('gulp-nodemon'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    path = require('path');
//   less = require('gulp-less');

/*
 * Create variables for our project paths so we can change in one place
 */
var paths = {
    'src': ['./models/**/*.js', './routes/**/*.js', 'keystone.js', 'package.json']
};


// gulp lint
gulp.task('lint', function () {
    gulp.src(paths.src)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintReporter));

});

// gulp watcher for lint
gulp.task('watchLint', function () {
    gulp.src(paths.src)
        .pipe(watch())
        .pipe(jshint())
        .pipe(jshint.reporter(jshintReporter));
});
gulp.task('develop', function () {
    nodemon({
        script: 'keystone.js',
        ext: 'html js',
        ignore: ['ignore.js']
    });
    nodemon.on('change', ['lint'])
        .on('restart', function () {
            console.log('restarted');
        });
});

/*
gulp.task('less', function () {
    gulp.src('')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/css'));
});
*/