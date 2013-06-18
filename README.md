LServer
=======
STATIC/HTML/EJS/DEMO SERVERS ALL IN ONE!

HOWTO USE
=======
1. > npm i
2. Create a folder named UPLOAD at root directory
3. > node server

PATCH
=======
Replace the code in file:

    node_modules/connect/lib/middleware/directory.js

with:

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
