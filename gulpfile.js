const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}

function cleanDist() {
    return del('dist')
}

function images() {
    return src('app/images/**/*')
        .pipe(imagemin(
            [
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        { removeViewBox: true },
                        { cleanupIDs: false }
                    ]
                })
            ]
        ))
        .pipe(dest('dist/images'))
}

function scripts() {
    return src([

        // 'node_modules/jquery/dist/jquery.js',
        'app/js/itc-slider.js',
        'node_modules/wowjs/dist/wow.js',
        'app/js/main.js'
    ])

        .pipe((concat('main.min.js')))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function styles() {
    return src([

        'app/scss/style.scss'
    ])
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html',
        'app/php/**/*'
    ], { base: 'app' })
        .pipe(dest('dist'))
}

function watching() {
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload)
}

function hosting() {
    var conn = ftp.create({
        host: 'vh372.timeweb.ru',
        user: 'ch44857',
        password: fs.readFileSync("E:\Desktop on E\Landing_and_features/key.txt", "utf8"),
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        'dist/**/*.*'
    ];

    return src(globs)
        .pipe(conn.newer('/public_html'))
        .pipe(conn.dest('/public_html'));

}


exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.hosting = hosting;

exports.build = series(styles, scripts, cleanDist, images, build, hosting);
exports.buildNotFull = series(styles, scripts, cleanDist, build, hosting);
// exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, browsersync, watching);