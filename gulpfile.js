const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babel = require('babelify');

function compile(watch) {
	const bundler = browserify('./index.js', { debug: true, standalone: 'acacia' })
		.transform(babel.configure({
			presets: ['es2015'],
		}));

	function rebundle() {
		bundler.bundle()
			.on('error', function (err) { console.error(err); this.emit('end'); })
			.pipe(source('acacia.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./dist'));
	}

	rebundle();
}

gulp.task('build', function () { return compile(); });

gulp.task('default', ['build']);
