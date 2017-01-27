var geraUrl = function(body){
    var _body = JSON.parse(body);
      var _img = _body.photoset.photo;
      for(var key in _img) {
          _img[key].thumb = "https://farm"+_img[key].farm+".staticflickr.com/"+_img[key].server+"/"+_img[key].id+"_"+_img[key].secret+"_q.jpg"
          _img[key].src = "https://farm"+_img[key].farm+".staticflickr.com/"+_img[key].server+"/"+_img[key].id+"_"+_img[key].secret+"_c.jpg"
      }
      var consulta = {
          imagens : _img,
          album : _body.photoset
      }
      
      return consulta;
}

module.exports.geraUrl = geraUrl;