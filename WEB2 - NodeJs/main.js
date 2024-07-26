var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id

    if(pathname === '/'){
      if(queryData.id === undefined){
          fs.readdir('./data', function(err, filelist){
            console.log(filelist);
            var title = 'Welcome!';
          var description = 'Hello, NodeJS';  
        /*
          var list = `<ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>`
        */
       var list ='<ul>';
       var i = 0;
       while(i < filelist.length){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i= i+1;
       } 
       list = list +'</ul>';
          const template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
      response.writeHead(200);
      response.end(template);
          })
      } else {
    fs.readFile(`data/${queryData.id}`,'utf8', (err, description)=>{
      const template = `
      <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    <ul>
    <li><a href="/?id=CSS">CSS</a></li>
    <li><a href="/?id=HTML">HTML</a></li>
    <li><a href="/?id=JavaScript">JavaScript</a></li>
    </ul>
    <h2>${title}</h2>
    <p>${description}</p>
  </body>
  </html>
  `;
  response.writeHead(200);
  response.end(template);
    });}
  } else {
    response.writeHead(404);
  response.end('404 Not Found');
  }
 
});
app.listen(3000);