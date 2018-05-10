
function OmaApi() {
  this.host = '//localhost'
  this.port = 4000
  this.api_prefix = '/api/v1'
  this.scheme = {
    'ping': '/server/ping',
    'signin': '/users/auth',
  }

}

OmaApi.prototype.ping = function (opt) {
  this.get('ping',function(res){
    console.log(res['data'])
  })
};

OmaApi.prototype.signin = function (auth_data) {
  this.post('signin',auth_data,function(res){ console.log(res['data']) })
};

OmaApi.prototype.get = function(path, callback){
  var xhr = new XMLHttpRequest();
  uri = this.api_uri(path)
  xhr.open('GET', uri);
  xhr.onload = function() {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
      else {
        alert('XHR Failed: ' + xhr.status);
      }
  };
  xhr.send();
}

OmaApi.prototype.post = function(path, data, callback){
  var xhr = new XMLHttpRequest();
  uri = this.api_uri(path)
  xhr.open('POST', uri);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
      else if (xhr.status !== 200) {
        alert('XHR Failed: ' + xhr.status);
      }
  };
  xhr.send(JSON.stringify(data));
}

OmaApi.prototype.api_uri = function(path){
  return this.host + ':' + this.port + this.api_prefix + this.scheme[path]
}