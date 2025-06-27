import { src, dest, watch, series, parallel } from "gulp";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import terser from "gulp-terser";
import htmlmin from "gulp-htmlmin";
import newer from "gulp-newer";
import browserSyncLib from "browser-sync";
import { deleteAsync } from "del";
import { promises as fs } from "fs";
import path from "path";

const sass = gulpSass(dartSass);
const browserSync = browserSyncLib.create();

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
  return deleteAsync(["resources/**", "!resources"]);
}

// Compile and minify SCSS files
export function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Minify HTML files
export function html() {
  return src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Minify JS files
export function scripts() {
  return src(paths.scripts.src)
    .pipe(terser())
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Dev Server
export function serve() {
  browserSync.init({
    server: {
      baseDir: "resources/",
    },
  });

  watch(paths.html.src, html);
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
}

// Build task
// Add this to your build task
export const build = series(
  clean,
  parallel(html, styles, scripts)
);

// Default task
export default series(build, serve);
