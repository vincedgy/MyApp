/**
 * Created by Vincent on 02/11/2014.
 */
'use strict';
var gulp = require('gulp');
var rev  = require('gulp-rev');

var files = [
    'assets/app.css',
    'assets/app.js',
    'static/components/angular/angular.min.js',
    'static/components/angular-route/angular-route.min.js'
];

gulp.task('rev', ['js', 'css'], function () {
    gulp.src(files)
        .pipe(rev())
        .pipe(gulp.dest('assets'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('assets'))
});