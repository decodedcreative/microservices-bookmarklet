var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util');
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-ruby-sass'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return sass('src/scss/app.scss', { sourcemap: true })
        .on('error', sass.logError)


        .pipe(autoprefixer({
            browsers: ["last 4 versions", "Firefox >= 27", "Blackberry >= 7", "IE 8", "IE 9"],
            cascade: false
        }))
        .pipe(cssnano())

        // For inline sourcemaps
        .pipe(sourcemaps.write())

        // For file sourcemaps
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'src/scss'
        }))

        .on('error', function(e) {
            console.log(e);
        })

        .pipe(gulp.dest("css"))

        .pipe(notify("SASS compilation complete: <%=file.relative%>"))

});

gulp.task('es6', function() {
	browserify({
    	entries: './src/js/app.js',
    	debug: true
  	})
    .transform(babelify)
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('app.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('watch',function() {
	gulp.watch('./src/js/**/*.js',{debounceDelay: 5000},['es6'])
    gulp.watch("src/scss/**/*.scss", ['sass'])
});
 
gulp.task('default', ['es6', 'sass', 'watch']);