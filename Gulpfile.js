var gulp = require('gulp'),
		sass = require('gulp-sass'),
		inject = require('gulp-inject'),
		karma = require('gulp-karma'),
		protractor = require('gulp-protractor').protractor,
		webdriver_update = require('gulp-protractor').webdriver_update,
		browserSync = require('browser-sync'),
		reload = browserSync.reload;

var paths = {
	scripts: ['src/app.js', 'src/fakeData.js', 'src/app-controller.js', 'src/modules/**/*.js', '!src/modules/**/*.test.js', '!src/modules/**/*.spec.js'],
	html: ['src/**/*.html'],
	unitTests: ['src/modules/**/*.test.js']
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

gulp.task('test:unit', function(){
	return gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      this.emit('end'); //instead of erroring the stream, end it
    });
});

gulp.task('webdriver_update', webdriver_update);
gulp.task('test:e2e', ['webdriver_update'], function(){
	gulp.src('./foobar')
  .pipe(protractor({
      configFile: 'protractor.conf.js',
      args: ['--verbose']
  })) 
  .on('error', function(e) { throw e });
});

gulp.task('tdd', function(){
	karma.start({
    configFile: __dirname + '/karma.conf.js'
  });	
});

gulp.task('dev', ['sass', 'inject', 'browser-sync'], function(){
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch(paths.html, [reload]);
	gulp.watch(paths.scripts, ['inject', reload]);
	gulp.watch(paths.unitTests, ['test:unit']);
});