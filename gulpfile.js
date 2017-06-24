const gulp = require('gulp')
const eslint = require('gulp-eslint')
const minify = require('gulp-minify')

const minifyConfig = {
  ext: {
    src: '.js',
    min: '.min.js'
  }
}

gulp.task('javascript', () => {
  return gulp.src(['js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(minify(minifyConfig))
    .pipe(gulp.dest('dist'))
})

gulp.task('setup', () => {
  return gulp.src(['*.js', '*.json'])
    .pipe(eslint())
    .pipe(eslint.format())
})

gulp.task('watch', ['javascript'], () => {
  gulp.watch(['js/*.js'], ['javascript'])
})

gulp.task('build', ['setup', 'javascript'])
