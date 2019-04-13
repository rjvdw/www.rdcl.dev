'use strict'

const path = require('path')
const gulp = require('gulp')
const clean = require('gulp-clean')
const rename = require('gulp-rename')

const PROJECT_ROOT = path.resolve(__dirname, '..', '..')
const APPS_DIR = `${ PROJECT_ROOT }/apps`
const PUBLIC_DIR = `${ APPS_DIR }/www/public`
const DIST_DIR = `${ PROJECT_ROOT }/dist`
const APPS = [
  'fourier',
  'tools',
]
const APP_DIST_DIRS = APPS.map(into`${ APPS_DIR }/{}/dist`)

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
  .pipe(rename(stripDistFromDirName))
  .pipe(gulp.dest(DIST_DIR))
)

gulp.task('collect', gulp.parallel('collect:public', 'collect:dists'))

gulp.task('default', gulp.series('clean', 'collect'))

function into(strings, ...vars) {
  let template = strings[0]

  for (let i = 0; i < vars.length; i += 1) {
    template += vars[i] + strings[i + 1]
  }

  return val => template.replace('{}', val)
}

function stripDistFromDirName(source) {
  source.dirname = source.dirname.replace(/^([^\/]+)\/dist/, '$1')
}
