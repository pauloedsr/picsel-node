var request = require('request');

var exec = function(_photoset,_user,_page,callback){
    var _url =  'https://api.flickr.com/services/rest/?'+
                'method=flickr.photosets.getPhotos'+
                '&api_key=dca44ffcc619cd909fe158d65fef02fa'+
                '&photoset_id='+ _photoset +
                '&user_id='+ _user +
                '&format=json'+
                '&nojsoncallback=1'+
                '&per_page=300'+
                '&page='+_page;
    
    request(_url, function (error, response, body) {
       if (!error && response.statusCode == 200) {
            var _body = JSON.parse(body);
            
            if(_body.stat == 'fail'){
                callback(false);
            } else {
                var _img = _body.photoset.photo;
                for(var key in _img) {
                    _img[key].thumb = "https://farm"+_img[key].farm+".staticflickr.com/"+_img[key].server+"/"+_img[key].id+"_"+_img[key].secret+"_q.jpg"
                    _img[key].src = "https://farm"+_img[key].farm+".staticflickr.com/"+_img[key].server+"/"+_img[key].id+"_"+_img[key].secret+"_c.jpg"
                }
                var consulta = {
                    imagens : _img,
                    album : _body.photoset
                }
                callback(consulta);
            }
       } else {
           callback(error);
       }
    });
    //return consulta;
}
module.exports.exec = exec;