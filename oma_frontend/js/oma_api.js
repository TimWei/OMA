
function OmaApi(opt={}) {
  this.user= {
    name: '',
    access_token: ''
  }
  this.host = opt['host']
  this.port = opt['port']
  this.api_prefix = opt['api_prefix']
  this.scheme = {
    'ping': '/server/ping',
    'signin': '/users/auth',
    'get_lists': '/todo_lists',
    'post_lists': '/todo_lists',
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
  that = this;
  this.get('get_lists', function(res){ 
    that.set_greeting();
    console.log(res['data']['lists']) 
    lists_data = res['data']['lists'];
    that.clear_lists();
    that.append_list(lists_data)
    callback();
  })
};

OmaApi.prototype.post_lists = function (list_name, callback) {
  that = this;
  this.post('post_lists', {
    access_token: this.user.access_token,
    list_name: list_name
  } , function(res){ 
    console.log(res);
    that.append_list([res['data']]);
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

////// DOM controller
OmaApi.prototype.toggle = function(id, display) {
  ele = document.getElementById(id);
  atr = ele.style.display;
  if(atr != display ){
    ele.style.display = display;
  }else{
    ele.style.display = 'none';
  }
//  window.app.oma.toggle('new_form_name')
}

OmaApi.prototype.set_greeting = function(){
  document.getElementById('user_name').textContent = that.user.name;
}

OmaApi.prototype.clear_lists = function(){
  lists = document.getElementsByClassName('lists')[0];
  Array.from(lists.children).forEach(function(e){
    if(e.classList.length == 0){e.remove()}
  })
}

OmaApi.prototype.append_list = function(data){
  lists = document.getElementsByClassName('lists')[0];
  console.log(data);
  data.forEach(function(data){
    ele = document.createElement('li');
    ele.textContent = data.name;
    ele.setAttribute('data-list',data.short_cut);
    lists.prepend(ele);
  });
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

