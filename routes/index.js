var express = require('express');
var flickr = require('../models/flickr-old');
var Flickr = require('flickr-js');
var Auth = require('../models/auth');
var Util = require('../models/util');

var client = new Flickr('dca44ffcc619cd909fe158d65fef02fa','1eb446e2d5e17aa0');


var router = express.Router();

/* GET home page. */
router.get('/ensaio/:photoset/:user/:page', function(req, res, next) {
  flickr.exec(req.params.photoset, req.params.user, req.params.page, function(data){
    if(data === true){
      res.render('error');
    } else {
      res.render('index', {imagens : data.imagens, album : data.album, title : 'Título'});
    }
  });
});

router.get('/:photoset/:user', function(req, res, next) {
  Auth.findOne({}, function(err, result){
    if(err) return res.send(err);
    client.apiCall('GET','flickr.photosets.getPhotos',{'auth_token': result.token , 'photoset_id':req.params.photoset, 'user_id':req.params.user}, function(error, response, body){
      var consulta = Util.geraUrl(body);
      res.render('index', {imagens : consulta.imagens, album : consulta.album, title : 'Título'});
    });
  });
});

router.get('/auth-frob', function(req, res, next) {
  client.apiCall('GET','flickr.auth.getFrob',{}, function(error, response, body){
    console.log(body);
    var _body = (JSON.parse(body));
    res.send(_body)
  });
});

//URL PARA AUTENTICAR USUARIO
router.get('/auth-url', function(req, res, next) {
  var auth = client.getAuthURL('read');
  res.statusCode = 302;
  res.setHeader('Location', auth);
  res.end();
});

router.get('/token', function(req, res, next) {
  client.apiCall('GET','flickr.auth.getToken',{'frob':req.query.frob}, function(error, response, body){
    console.log(body);
    var _body = JSON.parse(body);
    var auth = {
      token : _body.auth.token._content,
      nsid : _body.auth.user.nsid
    }
    new Auth(auth).save(function(error, result){
      res.send(result);
    });
  });
});

module.exports = router;