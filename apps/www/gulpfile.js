'use strict'

const path = require('path')
const gulp = require('gulp')
const clean = require('gulp-clean')
const rename = require('gulp-rename')

const PROJECT_ROOT = path.resolve(__dirname, '..', '..')
const APPS_DIR = `${ PROJECT_ROOT }/apps`
const PUBLIC_DIR = `${ APPS_DIR }/www/public`
const DIST_DIR = `${ PROJECT_ROOT }/dist`
const FUNCTIONS_DIR = `${ PROJECT_ROOT }/functions`

const APP_DIST_DIRS = [
  ['fourier', 'dist'],
  ['reading', '_site'],
  ['shared-styles', 'dist'],
  ['tools', 'dist'],
].map(into`${ APPS_DIR }/{}/{}`)

const FUNCTIONS_DIST_DIRS = [
  ['agenda', 'functions'],
].map(into`${ APPS_DIR }/{}/{}`)

gulp.task('clean', () => gulp
  .src([DIST_DIR], { read: false, allowEmpty: true })
  .pipe(clean({ force: true }))
)

gulp.task('collect:public', () => gulp
  .src(`${ PUBLIC_DIR }/**/*`, { base: PUBLIC_DIR })
  .pipe(gulp.dest(DIST_DIR))
)

gulp.task('collect:dists', () => gulp
  .src(APP_DIST_DIRS.map(into`{}/**/*`), { base: APPS_DIR })
  .pipe(stripDirName('dist', '_site'))
  .pipe(gulp.dest(DIST_DIR))
)

gulp.task('collect:functions', () => gulp
  .src(FUNCTIONS_DIST_DIRS.map(into`{}/**/*`), { base: APPS_DIR })
  .pipe(rename(source => {
    // All functions should end up in dist/functions. This means all functions should have unique names!
    source.dirname = source.dirname.replace(/.*\/functions\/?/, '')
  }))
  .pipe(gulp.dest(`${ FUNCTIONS_DIR }`))
)

gulp.task('collect', gulp.parallel('collect:public', 'collect:dists', 'collect:functions'))

gulp.task('default', gulp.series('clean', 'collect'))

function into(strings, ...vars) {
  let template = strings[0]

  for (let i = 0; i < vars.length; i += 1) {
    template += vars[i] + strings[i + 1]
  }

  return values => Array.isArray(values)
    ? values.reduce((tpl, val) => tpl.replace('{}', val), template)
    : template.replace('{}', values)
}

function stripDirName(...dirs) {
  const re = new RegExp(`^([^/]+)/(?:${ dirs.join('|') })`)

  return rename(source => {
    source.dirname = source.dirname.replace(re, '$1')
  })
}
