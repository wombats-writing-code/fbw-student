

const gulp = require('gulp');
const gulpWatch = require('gulp-watch')

const DIR_PATH = '../platform-common/**/*.js';

gulp.task('copy', function () {

    return gulpWatch([DIR_PATH, '../platform-common/assets/*.png', '!../platform-common/node_modules/**/*.*'], {
      read: false,
      ignoreInitial: false,
      verbose: true,
    }, function () {
      gulp.src([DIR_PATH, '../platform-common/assets/*.png', '!../platform-common/node_modules/**/*.*'], {base: '../'})
      .pipe(gulp.dest('node_modules'));
    })
});
