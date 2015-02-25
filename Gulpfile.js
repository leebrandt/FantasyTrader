var gulp = require('gulp'),
		sass = require('gulp-sass'),
		inject = require('gulp-inject'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload;

var paths = {
	scripts: ['src/app.js', 'src/app-controller.js', 'src/modules/**/*.js'],
	html: ['src/**/*.html']
}

gulp.task('sass', function(){
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('src/css'))
		.pipe(reload({stream:true}));
});

gulp.task('inject', function(){
	return gulp.src('src/index.html')
		.pipe(inject(gulp.src(paths.scripts, {read:false}), {ignorePath:'/src/'}))
		.pipe(gulp.dest('src/'));
});	

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'src/'
		}
	});
});

gulp.task('dev', ['sass', 'inject', 'browser-sync'], function(){
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch(paths.html, [reload]);
	gulp.watch(paths.scripts, ['inject', reload])
});