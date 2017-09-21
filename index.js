require('dotenv').config();
var express = require('express');
var multer = require('multer');
var cloudinary = require('cloudinary');
var upload = multer({dest: './uploads/'});
var app = express();

app.set('view engine', 'pug');
app.set('view options', {
  layout: false // pug has default layout functionality
});

var images = [];

app.get('/', function(req, res) {
  res.render('index', {images, cloudinary});
});

app.post('/', upload.single('file'), function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    images.push(result.public_id);
    res.redirect('/');
  });
});

app.listen(3000);
