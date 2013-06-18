var _g = {},
    script = document.getElementsByTagName('script')['requirejs'];
_g.mod = script.attributes['data-mod'].value || 'main';
_g.env = script.attributes['data-env'].value || 'dev';

require.config({
  
  config: {},
  urlArgs: 'v=1.1',

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
  },

  paths: {
    jquery: 'lib/jquery/1.8.3',
    underscore: 'lib/underscore/1.4.4',
    backbone: 'lib/backbone/backbone/1.0',
    canjs: 'lib/canjs/1.1.6/jquery.core',
    parsley: 'pkg/formValidation/Parsley/parsleyIntegrate'
  }

});

require(['mod/'+_g.mod], function(){
  // run anywhere
  console.log('bootstrap!');
});