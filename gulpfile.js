var gulp       = require('gulp'); // Подключаем Gulp
var sass       = require('gulp-sass'); // Подключаем sass
var browserSync = require('browser-sync').create(); // Подключаем browser Sync
var concat       = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
var sourcemaps  = require('gulp-sourcemaps');



// Static server
gulp.task('browser-sync',  function() {
    browserSync.init({ 
         server: {
            baseDir: "./app"  
         }   
    });
});


gulp.task('watch', ['browser-sync', 'sprite'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch(['app/img/icons/**/*.png'], ['sprite']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass() ) //using gulp-sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
 });

 gulp.task('javascript', function() {
    return gulp.src('app/js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist'));
  });


gulp.task('default', ['watch']);