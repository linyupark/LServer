/*
  @name        LServer
  @descript    STATIC/HTML/DEMO SERVERS ALL IN ONE!
  @author      linyupark@gmail.com

  列表美化补丁，替换
  node_modules/connect/lib/middleware/directory.js
  var icons = {
    '.js': 'page_white_code_red.png'
    , '.HTML': 'page_white_star.png'
    , '.css': 'page_white_c.png'
    , '.html': 'page_white_world.png'
    , '.0': 'page_white_zip.png'
    , '.1': 'page_white_zip.png'
    , '.2': 'page_white_zip.png'
    , '.3': 'page_white_zip.png'
    , '.4': 'page_white_zip.png'
    , '.5': 'page_white_zip.png'
    , '.6': 'page_white_zip.png'
    , '.7': 'page_white_zip.png'
    , '.8': 'page_white_zip.png'
    , '.9': 'page_white_zip.png'
    , '': 'page_white_zip.png'
    , 'default': 'page_white.png'
  };
*/

var connect  = require('connect'),
    fs       = require('fs'),
    ejs      = require('ejs'),
    os       = require('os'),
    compiler = require('connect-compiler');

var ports = {
  STATIC: 81, // 静态服务端口
  DEMO: 82, // 模拟请求服务端口
  HTML: 83 // 模板引擎服务端口
};

console.info("-----------------------\n LServer v1.0.0\n-----------------------");

// walk directory files
var dive = function(dir, cb){
  if(typeof cb !== 'function'){
    cb = function(err, filepath){};
  }
  fs.readdir(dir, function(err, list){
    if(err) return cb(err);
    list.forEach(function(file){
      var path = dir + '/' + file;
      fs.stat(path, function(err, stat){
        if(stat && stat.isDirectory()){
          dive(path, cb);
        } else {
          return cb(null, path);
        }
      });
    });
  });
};

// 设置IP
var getIP = function(){
  var interfaces = os.networkInterfaces();
  for(k in interfaces){
    for(k2 in interfaces[k]){
      var address = interfaces[k][k2];
      if(address.family === 'IPv4' && !address.internal){
        return address.address;
      }
    }
  }
};

/* 静态资源服务 */
connect()
.use(function(req, res, next){
  // 跨域xhr
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
})
.use(compiler({
  enabled : ['coffee', 'less'],
  src: 'STATIC',
  log_level: 'warn',
  options: {
    'less': {
      paths: [__dirname + '/STATIC'],
      compress: true
    }
  }
}))
.use(connect.static(__dirname + '/STATIC'))
.listen(ports.STATIC, function(){
  console.log('Static Server Port:'+ports.STATIC);
});
// 实时编译coffee(需要coffee全局)
cp = require('child_process');
cp.exec("coffee -cw " + __dirname + '/STATIC');
/////////////////////////


/* 模拟请求处理服务 */
connect()
.use(connect.static(__dirname + '/UPLOAD'))
.use(connect.bodyParser({
  uploadDir: __dirname + '/UPLOAD',
  keepExtensions: true
}))
.use(connect.query())
.use('/getHTML', function(req, res){
  res.writeHeader(200, {"Content-Type": "text/html; charset=UTF-8"});
  res.end(req.query.body);
})
.use('/getJSON', function(req, res){
  res.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8'});
  res.end(JSON.stringify(req.query));
})
.use('/postJSON', function(req, res){
  res.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8'});
  res.end(JSON.stringify(req.body));
})
.use(function(req, res){
  if('POST' === req.method){
    res.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8'});
    var info = req.files[Object.keys(req.files)[0]];
    var data = {
      size: info.size,
      url: '/' + info['name'],
      name: info.name,
      type: info.type,
      mtime: info.mtime
    }
    res.end(JSON.stringify(data));
  }
  res.end();
})
.listen(ports.DEMO, function(){
  fs.readdir(__dirname + '/UPLOAD', function(err, files){
    if(err) throw err;
    files.forEach(function(file){
      fs.unlink(__dirname + '/UPLOAD/' + file, function(err){
        if(err) console.error(err);
        else console.log('Delete temp upload file:'+file);
      });
    });
  });
  console.log('Demo Server Port:'+ports.DEMO);
});

/* 页面服务 */
var HTMLServer = connect()
.use(
  connect.directory(__dirname + '/HTML', {
    icons: true,
    filter: function(file){ 
      // hidden _* folders
      return (file.indexOf('_') !== 0); 
    } 
  })
)
.use(connect.bodyParser())
.use(connect.query())

var setupHTML = function(path, project){
  dive(path, function(err, filepath){
    // 中文urlencode
    var filepathArr = filepath.split('/').map(function(item){
      if(item.indexOf('\\') !== -1) return item;
      else return encodeURIComponent(item);
    });
    var page = filepathArr.splice(-1);
    var url = filepathArr.join('/').replace(path, '/' + project);
    HTMLServer.use(url+'/'+page, function(req, res){
      fs.stat(filepath, function(err, stats){
        var d = new Date(stats.mtime);
        var mtime = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes();
        fs.readFile(filepath, function(err, html){
          if(err){
            console.error(err);
            res.end(err);
          }
          // 确定后缀
          var ext = filepath.split('.').pop();
          if(ext === 'ejs') ext = 'html';
          if(ext === 'js') ext = 'javascript';
          res.writeHeader(200, {"Content-Type": "text/"+ext+"; charset=UTF-8"});
          res.write(ejs.render(
            String(html),
            {
              filename: filepath,
              '_get': req.query,
              '_ip': getIP(),
              '_mtime': mtime,
              '_static': 'http://'+getIP()+':'+ports.STATIC+'/'+project,
              '_upload': 'http://'+getIP()+':'+ports.DEMO,
              '_getJSON': 'http://'+getIP()+':'+ports.DEMO+'/getJSON',
              '_getHTML': 'http://'+getIP()+':'+ports.DEMO+'/getHTML',
              '_postJSON': 'http://'+getIP()+':'+ports.DEMO+'/postJSON'
            }
          ));
          res.end();
        });
      });
    });
  });
};

var checkHTMLs = function(){
  fs.readdir(__dirname + '/HTML', function(err, projects){
    projects.forEach(function(project){
      setupHTML(__dirname + '/HTML/' + project, project);
    });
  });
  process.stdout.clearLine();
  process.stdout.cursorTo(0)
  process.stdout.write("Keep working ["+new Date().toLocaleTimeString()+"]");
  setTimeout(checkHTMLs, 5000);
};

HTMLServer.listen(ports.HTML, function(){
  console.log('HTML Server Port:'+ports.HTML);
  checkHTMLs();
});

// io server -> sockets.js
// require('./sockets');