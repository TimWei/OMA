
function OmaApi() {
  this.user= {
    name: '',
    access_token: ''
  }
  this.host = '//localhost'
  this.port = 4000
  this.api_prefix = '/api/v1'
  this.scheme = {
    'ping': '/server/ping',
    'signin': '/users/auth',
    'get_lists': '/todo_lists',
  }
}

OmaApi.prototype.ping = function (opt) {
  this.get('ping',function(res){
    console.log(res['data'])
  })
};

OmaApi.prototype.signin = function (auth_data, callback) {
  let that = this;
  this.post('signin', auth_data, function(res){ 
    console.log(res['data']) 
    user_info = res['data'];
    that.set_user({
            name: user_info['name'],
            email:  user_info['email'],
            access_token: user_info['access_token'],
        });
    callback();
  })
};

OmaApi.prototype.get_lists = function (callback) {
  this.get('get_lists', function(res){ 
    console.log(res['data']['lists']) 
    callback();
  })
};

OmaApi.prototype.get = function(path, callback){
  var xhr = new XMLHttpRequest();
  uri = this.api_uri(path) + '?access_token=' + this.user.access_token
  xhr.open('GET', uri);
  xhr.onload = function() {
      res = JSON.parse(xhr.responseText)
      if (xhr.status === 200 && res['data']['error'] != 1) {
        callback(res);
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


//////User Auth/Validations

OmaApi.prototype.set_user = function (user) {
  this.user = user
};

OmaApi.prototype.user_invalid = function (user) {
  return this.user['access_token'] == '' ? true : false
};

OmaApi.prototype.user_required = function (callback) {
    if(this.user_invalid()){
        callback();
    }
};

