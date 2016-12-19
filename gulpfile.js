var gulp = require('gulp'),
		concat = require('gulp-concat'),
		connect = require('gulp-connect'),
		uglifycss = require('gulp-uglifycss'),
		uglify = require('gulp-uglify'),
		sass	=	require('gulp-sass'),
		plumber	=	require('gulp-plumber'),
		compass	=	require('gulp-compass'),
		watch	=	require('gulp-watch'),
		rename	=	require('gulp-rename'),
		opt	=	require('gulp-imagemin'),
		preen	=	require('preen'),
		svg = require('gulp-svg2png'),
		config = require('./config')();

gulp.task('default',['compass','img','script','connect','html','watch','boot']);

gulp.task('watch',[],function(){
	watch(config.sass.src, function(){
		gulp.start('compass');
	});
	watch(config.js.src, function(){
		gulp.start('script');
	});
	watch(config.img.src, function(){
		gulp.start('img');
	});
	watch('dist/**/*.html',function(){
		gulp.start('html');
	} );
    watch('./src/sass/test.scss',function(){
		gulp.start('boot');
	} );
});


gulp.task('sass',function(){
	gulp.src(config.sass.src)
		.pipe(	plumber()	)
		.pipe(	sass({
			sourceComments:'normal'
		})	)
		.pipe(	gulp.dest(config.sass.dest)	);
});

gulp.task('compass', function(){
	gulp.src(config.sass.src)
	.pipe(compass({
		css:config.sass.dest,
		sass:config.sass.compassSrc
	}))
	.pipe(	concat('style.css')	)
	.pipe(	gulp.dest(config.sass.dest)	)
	.pipe(	uglifycss()	)
	.pipe(	rename({	suffix : '.min'})	)
	.pipe(	gulp.dest(config.sass.dest)	)
	.pipe(	connect.reload()	);
});

// /////////////////////////////////
//  Script 업무//////////////////////
// /////////////////////////////////
gulp.task('script', function(){
    gulp.src(config.js.src)
    .pipe(gulp.dest(config.js.dest))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dest))
	.pipe(	connect.reload()	);
});
//liveload
gulp.task('connect', function() {
  connect.server({
  	port: 8888,
    root: 'dist',
    livereload: true
  })
  connect.reload()
});

gulp.task('html', function() {
    gulp.src('dist/**/*.html')
    .pipe(connect.reload())
});

//불필요 삭제
gulp.task('preen',function(){
	preen.preen({},function () {

	});
});

//이미지 압축
gulp.task('img', function(cb) {
    gulp.src(config.img.src)
    .pipe(opt())
    .pipe(gulp.dest('dist/images'));
});

//bower copy
gulp.task('bower:copy',function(){
    gulp.src('bower_components/bootstrap-sass/assets/javascripts/**')
		.pipe(	gulp.dest('src/js/vender/bootstrap')	)
	// gulp.src('bower_components/breakpoint/breakpoint/**')
	// .pipe(	gulp.dest('src/sass/breakpoint')	);
});


// /////////////////////////////////
//  bootstrap//////////////////////
// /////////////////////////////////
gulp.task('boot', function() {
    return gulp.src('./src/sass/test.scss')
    .pipe(sass({
        includePaths: [config.bootstrap.src + '/assets/stylesheets'],
    }))
    .pipe(gulp.dest('./dist/css/asset'));
});

gulp.task('fonts', function() {
    return gulp.src(config.bootstrap.src + '/assets/fonts/**/*')
    .pipe(gulp.dest('./dist/css/fonts'));
});
///////////////////


gulp.task('svg', function () {
    gulp.src(config.svg.src)
        .pipe(svg())
        .pipe(gulp.dest(config.svg.dest));
});
