'use strict';

var gulp = require('gulp');
var gdeploy = require('gulp-gh-pages');
// load gulp plugins
var $ = require('gulp-load-plugins')();

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var PORT = 8080,
    OUTPUT = '_public',
    TMP = '_tmp';

gulp.task('jade', function () {
    // render jade files excepts templates
    return gulp.src(['app/**/*.jade', '!app/**/_*.jade'])
        .pipe($.jade())
        .pipe(gulp.dest(TMP + '/'));
});

gulp.task('images', function () {
    return gulp.src(['app/imgs/**/*', '!app/imgs/**/_*'])
        .pipe(gulp.dest(TMP + '/imgs'));
});

gulp.task("webpack-dev-server", function() {
    var config = require('./webpack.config');

    config.debug = true;
    config.devtool = "#inline-source-map";

    config.entry.app.unshift("webpack-dev-server/client?http://localhost:" + PORT,
                             "webpack/hot/dev-server");

    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    var compiler = webpack(config);

    // https://github.com/webpack/docs/wiki/webpack-dev-server
    new WebpackDevServer(compiler, {
        contentBase: TMP,
        progress: true,
        hot: true,
        stats: {
            cached: false,
            colors: true
        }
    }).listen(PORT, "localhost", function(err) {
        if(err) throw new $.util.PluginError("webpack-dev-server", err);
        $.util.log("[webpack-dev-server]", "Run on http://localhost:" + PORT);
    });
});

gulp.task("webpack", function(callback) {
    var config = require('./webpack.config');
    webpack(config, function(err, stats) {
        if(err) throw new $.util.PluginError("webpack", err);
        $.util.log("[webpack]", stats.toString({
        }));
        callback();
    });
});

gulp.task('copy', ['jade', 'images'], function () {
    gulp.src([TMP + '/**/*.html',
             '!' + TMP + '/partials/**/*'])
        .pipe(gulp.dest(OUTPUT));

    gulp.src([TMP + '/imgs/**'])
        .pipe(gulp.dest(OUTPUT + '/imgs'));
});

gulp.task('build', ['copy', 'webpack']);

gulp.task('dev', ['jade', 'images'], function () {
    gulp.watch('app/**/*.jade', ['jade']);
    gulp.watch('app/imgs/**/*', ['images']);
    gulp.start('webpack-dev-server');
});

gulp.task('deploy', ['build'], function () {
        return gulp.src(['./' + OUTPUT + '/**/*'])
                .pipe(gdeploy({}));
});

gulp.task('clean', function () {
    return gulp.src([TMP, OUTPUT], { read: false }).pipe($.rimraf());
});

gulp.task('default', ['clean'], function () {
    gulp.start('dev');
});
