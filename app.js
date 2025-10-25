
const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

http.createServer( (req, res)=> {
    if (req.url == '/fileupload' && req.method.toLowerCase()=== 'post') {
      let form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        const uploadedFile = files.filetoupload[0];
        let tempFilePath = uploadedFile.filepath;
        let originalFilename = uploadedFile.originalFilename;
        let projectFilePath = path.join(__dirname, 'uploaded_files', originalFilename); 
        
        if (!fs.existsSync(path.join(__dirname, 'uploaded_files'))) {
          fs.mkdirSync(path.join(__dirname, 'uploaded_files'));
      }
        
        fs.rename(tempFilePath, projectFilePath, function (err) {
          if (err) throw err;
          
        });
        res.write('File uploaded and moved!');
          res.end();
   });
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
      res.write('<input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write('</form>');
      return res.end();
    }
  }).listen(8080);