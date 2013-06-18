define([], function(){

  /*
  异步加载css文件
  url: 地址
  */
  var loadCss = function(url){
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = require.toUrl(url);
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  return {
    loadCss: loadCss
  }

});