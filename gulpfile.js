var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

var paths = {
  scss: {
    src: 'src/**/*.scss',
    dest: 'dist'
  },
  css: {
    src: 'src/**/*.css',
    dest: 'dist'    
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist'    
  },
  tag: {
    src: 'src/**/*.tag',
    dest: 'dist'    
  }
};

function scss() {
  return ( 
    gulp
    .src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream())
  );     
}

function css() {
  return ( 
    gulp
    .src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.stream())
  );     
}

function html() {
  return ( 
    gulp
    .src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
  );     
}

function tag() {
  return ( 
    gulp
    .src(paths.tag.src)
    // .pipe(riot())
    .pipe(gulp.dest(paths.tag.dest))
  );     
}

function reload() {
  browserSync.reload();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch(paths.scss.src, scss);
  gulp.watch(paths.css.src, css);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.tag.src, tag);
  gulp.watch(paths.html.src).on('change', reload);
  gulp.watch(paths.tag.src).on('change', reload);
}
 
exports.watch = watch;
exports.scss = scss;
exports.css = css;
exports.html = html;
exports.tag = tag;

var build = gulp.parallel(scss, css, html, tag, watch);
 
gulp.task('build', build);
gulp.task('default', build);