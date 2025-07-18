import { src, dest, watch, series, parallel } from "gulp";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import noop from 'gulp-noop';
import sourcemaps from "gulp-sourcemaps";
import postcss from 'gulp-postcss';
import terser from "gulp-terser";
import htmlmin from "gulp-htmlmin";
import autoprefixer from 'autoprefixer';
import browserSyncLib from "browser-sync";
import cssnano from 'cssnano';
import { deleteAsync } from "del";

const sass = gulpSass(dartSass);
const browserSync = browserSyncLib.create();

// development or production
const isProd = (process.env.NODE_ENV || 'development').trim().toLowerCase() === 'production';

// Paths
const paths = {
  html: {
    src: "src/*.html",
    dest: "resources/",
  },
  styles: {
    src: "src/scss/**/*.scss",
    dest: "resources/css/",
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "resources/js/",
  },
};

// Clean resources folder
export function clean() {
  return deleteAsync(["resources/**", "!resources", "!resources/images"]);
}

// Compile and minify SCSS files
export function styles() {
  return src(paths.styles.src)
    .pipe(!isProd ? sourcemaps.init() : noop())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(!isProd ? sourcemaps.write() : noop())
    .pipe(dest(paths.styles.dest))
    .pipe(!isProd ? browserSync.stream() : noop());
}

// Minify HTML files
export function html() {
  return src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.html.dest))
    .pipe(!isProd ? browserSync.stream() : noop());
}

// Minify JS files
export function scripts() {
  return src(paths.scripts.src)
    .pipe(terser())
    .pipe(dest(paths.scripts.dest))
    .pipe(!isProd ? browserSync.stream() : noop());
}

// Dev Server
export function serve() {
  browserSync.init({
    server: {
      baseDir: ".",
    },
  });

  // watch(paths.html.src, html);
  watch(paths.styles.src, styles);
  // watch(paths.scripts.src, scripts);
}

// Build task
// Add this to your build task
export const build = series(
  clean,
  styles
  // parallel(html, styles, scripts)
);

// Default task
export default series(build, serve);
