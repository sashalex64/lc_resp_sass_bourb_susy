var gulp = require('gulp');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon').includePaths;
var neat = require('node-neat').includePaths;
var normalize = require('node-normalize-scss').includePaths;
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps'); 

//source paths
var htmlSource = 'app/*.html';
var sassSource = 'src/scss/**/*.scss';
var jsSource = 'src/js/*.js';

//exit paths
var html = 'app';
var css = 'app/css';
var js = 'app/js';



gulp.task('sass', function() {
  return gulp.src(sassSource)
  	  // .pipe(autoprefixer('last 10 versions'))
  	  .pipe(sourcemaps.init())
      .pipe(sass({
          outputStyle: 'expanded',
          sourceMap: true,
          includePaths: ['node_modules/bourbon/app/assets/stylesheets','node_modules/bourbon-neat/core', 'node_modules/susy/sass', 'node_modules/node-normalize-scss']
      }).on('error', sass.logError))
      .pipe(autoprefixer('last 10 versions'))

/*There are no Javascript-style single-line comments in CSS, only multi-line comments. Single-line // comments are supported by SASS/SCSS, but stripped from the resulting CSS.
Since autoprefixer only operates on CSS not SASS/SCSS you need to run sass() before autoprefixer():
				.pipe(sass(sassOptions).on('error', sass.logError))
				.pipe(autoprefixer(autoprefixerOptions))*/
		
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(css))
      .pipe(connect.reload());
});

gulp.task('js', function() {
	gulp.src(jsSource)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest(js))
		.pipe(connect.reload());
});


gulp.task('html', function() {
	gulp.src(htmlSource)
		.pipe(connect.reload())
});

gulp.task('connect', function() {
	connect.server({
		root: 'app', 
		livereload: true
	});
});
gulp.task('watch', ['connect', 'sass', 'js', 'html'], function () {
	gulp.watch([sassSource], ['sass']);
	gulp.watch([htmlSource], ['html']);
	gulp.watch([jsSource], ['js']);
});

gulp.task('default', ['watch']);