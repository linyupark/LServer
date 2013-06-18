({
  // appDir: './',
  baseUrl: './src',              // 定位js根目录
  dir: './dist',                // 优化压缩后的发布目录
  optimize: 'uglify',
  modules: [
    {
      name: 'mod/main',
    },
    {
      name: 'mod/mod1',
    },
    {
      name: 'mod/mod3',
    }
  ],
  fileExclusionRegExp: /^(r|build)\.js|(.*)\.(coffee)$/,
  optimizeCss: 'standard',
  removeCombined: true,
  paths: {
    jquery: 'lib/jquery/1.8.3',
    underscore: 'lib/underscore/1.4.4',
    backbone: 'lib/backbone/backbone/1.0',
    canjs: 'lib/canjs/1.1.6/jquery.core',
    parsley: 'pkg/formValidation/Parsley/parsleyIntegrate'
  },
  // CDN
  // paths: {
  //   jquery: [
  //     'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min',
  //     'lib/jquery/1.8.3'
  //   ]
  // }
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    canjs: {
      deps: ['jquery'],
      exports: 'can'
    },
    parsley: {
      deps: ['jquery']
    }
  }

})