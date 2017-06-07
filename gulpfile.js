'use strict';
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const express = require('express');
const gulp = require('gulp');
const del = require('del');
const wpConfig = require('./webpack.config.js');
const execSync = require('child_process').execSync;
const path = require('path');

gulp.task('clean', [], cb => {
  del(['dist']).then(() => cb());
});

gulp.task('checkVersion', cb => {
  const cwd = process.cwd();
  const version = process.env.npm_package_version;

  let exitCode = 0;
  try {
    execSync(`git ls-remote --exit-code --tags origin ${version}`, {
      cwd,
    });
  } catch (e) {
    exitCode = e.status;
  } finally {
    if (exitCode === 0) {
      cb('当前工程版本号已经被打成tag');
    } else if (exitCode !== 2) {
      cb('获取远程仓库tag失败, 或者还未建立远端对应git仓库');
    } else {
      cb();
    }
  }
});

gulp.task('docs', () => {
  wpConfig.devtool = 'source-map';
  wpConfig.entry = {
    demo: [
      './docs/index.js'
    ]
  };
  wpConfig.output = {
    path: path.join(__dirname, 'docs'),
    filename: '[name].js'
  };
  wpConfig.externals = {
    react: 'React',
    'react-dom': 'ReactDOM'
  };
  wpConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
  return gulp.src('./src/**/*.js')
    .pipe(gulpWebpack(wpConfig, webpack))
    .pipe(gulp.dest('docs'));
});

gulp.task('build', ['clean'],() => {
  wpConfig.devtool = 'source-map';
  wpConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
  return gulp.src('./src/**/*.js')
    .pipe(gulpWebpack(wpConfig, webpack))
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', cb => {
  const app = express();
  wpConfig.devtool = 'eval';
  wpConfig.entry = {
    index: [
      './demo/demo.js'
    ]
  };
  wpConfig.output = {
    path: path.join(__dirname, 'demo'),
    filename: '[name].js',
    publicPath: '/demo/'
  };
  wpConfig.externals = {
    react: 'React',
    'react-dom': 'ReactDOM'
  };
  Object.keys(wpConfig.entry).forEach(k => wpConfig.entry[k].unshift(
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?http://localhost:80',
    'webpack/hot/only-dev-server'
  ));
  wpConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
  const compiler = webpack(wpConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: wpConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(express.static(__dirname));
  app.get('/demo/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'demo', 'index.html'));
  });
  app.listen(80, err => {
    if (err) return console.log(err);
    console.log('Page is running at: http://localhost/demo/index.html');
    cb();
  });
});


gulp.task('default', ['build']);
