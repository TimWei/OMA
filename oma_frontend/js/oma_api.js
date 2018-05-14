function OmaApi(opt={}) {
  this.user = {
    name: '',
    access_token: ''
  }
  this.host = opt['host']
  this.port = opt['port']
  this.api_prefix = opt['api_prefix']
  this.cable      = opt['cable']
  this.comsumer   = ActionCable.createConsumer('ws://' + this.host + ':' + this.port + this.cable);
  this.list_channel    = null
  this.scheme     = {
    'ping': '/server/ping',
    'signin': '/users/auth',
    'get_lists': '/todo_lists',
    'post_lists': '/todo_lists',
    'invited' : '/todo_lists/invite',
    'get_list_items': '/todo_lists/:short_cut/items',
    'post_list_items': '/todo_lists/:short_cut/items',
    'put_list_items': '/todo_lists/:short_cut/items/:id',
  }
}

OmaApi.prototype.ping = function (opt) {
  this.get('ping',{},function(res){
  })
};

OmaApi.prototype.signin = function (auth_data, callback) {
  let that = this;
  this.post('signin',{}, auth_data, function(res){ 
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
  this.get('get_lists', {},function(res){ 
    that.set_greeting();
    lists_data = res['data']['lists'];
    that.clear_lists();
    that.append_list(lists_data)
    callback();
  })
};

OmaApi.prototype.post_lists = function (list_name, callback) {
  that = this;
  this.post('post_lists',{}, {
    access_token: this.user.access_token,
    list_name: list_name
  } , function(res){ 
    that.append_list([res['data']]);
    callback();
  })
};

OmaApi.prototype.get_list_items = function(short_cut, callback){
  that = this;
  this.get('get_list_items', {short_cut: short_cut},function(res){
    console.log(res)
    that.clear_items();
    that.set_list_title(res.data.list.name);
    that.set_share_link(res.data.list.short_cut);
    that.append_list_items(res.data.list.items);
    that.append_list_activities(res.data.list.history);
    that.connect_channel(short_cut);
    callback();
  })
}

OmaApi.prototype.post_list_items = function(data, callback){
  that = this;
  console.log(data)
  this.post('post_list_items',{short_cut: data.short_cut}, {
    access_token: this.user.access_token,
    content: data.content
  } , function(res){ 
    callback();
  })
}

OmaApi.prototype.put_list_items = function(data, callback){
  that = this;
  console.log(data)
  this.put('put_list_items',{id: data.id,short_cut: data.short_cut}, {
    access_token: this.user.access_token,
    finished: data.finished,
    is_delete: data.is_delete 
  }, function(res){ 
    callback();
  })
}

OmaApi.prototype.invited = function(short_cut, callback){
  that = this;
  this.post('invited',{}, {
    short_cut: short_cut,
    access_token: this.user.access_token,
  },function(res){
    callback();
  })
}

// Networking

OmaApi.prototype.get = function(path, opt, callback){
  this.xhr('GET', path, opt, null, callback);
}

OmaApi.prototype.post = function(path, opt, data, callback){
  this.xhr('POST', path, opt, data, callback);
}

OmaApi.prototype.put = function(path, opt, data, callback){
  this.xhr('PUT', path, opt, data, callback);
}

OmaApi.prototype.xhr = function(method, path, opt, data, callback){
  var xhr = new XMLHttpRequest();
  uri = this.api_uri(path, opt)
  if(method == 'GET'){
    uri += '?access_token=' + this.user.access_token
  } 
  xhr.open(method, uri);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
      res = JSON.parse(xhr.responseText)
      if (xhr.status === 200 && res['error'] != 1) {
        callback(JSON.parse(xhr.responseText));
      }
      else if (xhr.status !== 200) {
        alert('XHR Failed: ' + xhr.status);
      }
  };
  xhr.send(JSON.stringify(data));
}

OmaApi.prototype.api_uri = function(path, opt={}){
  path = this.scheme[path]
  pattern = path.match('/:([a-zA-Z0-9_-]*)')
  while(pattern){
    path = path.replace(new RegExp('/:[a-zA-Z0-9_-]*'), '/' + opt[pattern[1]])
    pattern = path.match('/:([a-zA-Z0-9_-]*)')
  }
  return this.host + ':' + this.port + this.api_prefix + path
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

OmaApi.prototype.clear_items = function(){
  lists = document.getElementsByClassName('items')[0];
  Array.from(lists.children).forEach(function(e){
    if(!e.classList.contains('new_item') && !e.classList.contains('new_item_form') ){e.remove()}
  })
}

OmaApi.prototype.set_list_title = function(list_name){
  document.getElementById('list_name').textContent = list_name;
}

OmaApi.prototype.set_share_link = function(short_cut){
  document.getElementById('share_link_url').textContent = window.location.origin + '/#invite/' + short_cut;
}

OmaApi.prototype.append_list_items = function(data){
  lists = document.getElementsByClassName('items')[0];
  that = this;
  if(data.length == 0){
    ele = document.createElement('h3');
    ele.textContent = 'No Tasks yet!';
    lists.prepend(ele);
  }else{
    data.forEach(function(row){
        that.append_list_item(row)
    });
  }
}

OmaApi.prototype.append_list_activities = function(data){
  history = document.getElementsByClassName('history')[0];
  that = this;
  data.forEach(function(row){
    that.append_list_activity(row)
  });
}

OmaApi.prototype.append_list = function(data){
  lists = document.getElementsByClassName('lists')[0];
  data.forEach(function(data){
    ele = document.createElement('li');
    ele.textContent = data.name;
    ele.setAttribute('data-list',data.short_cut);
    ele.onclick = function(){window.location.href = '#list/' + data.short_cut}
    lists.prepend(ele);
  });
}

OmaApi.prototype.append_list_item = function(data){
  lists = document.getElementsByClassName('items')[0];
  ele = document.createElement('li');
  ele.textContent = data.content;
  ele.setAttribute('data-list-item-id',data.id);
  ele.className = data.finished;
  fin_btn = document.createElement('button');
  this.set_fin_btn(fin_btn, data);
  del_btn = document.createElement('button');
  this.set_del_btn(del_btn, data);
  ele.append(fin_btn);
  ele.append(del_btn);
  lists.prepend(ele);
}

OmaApi.prototype.append_list_activity = function(data){
  ul = document.getElementsByClassName('history')[0];
  ele = document.createElement('li');
  user_s = document.createElement('span');
  user_s.textContent = data.user
  user_s.className = 'user'
  action_s = document.createElement('span');
  action_s.textContent = data.action
  action_s.className = 'action'
  content_s = document.createElement('span');
  content_s.textContent = data.content
  content_s.className = 'content'
  date_s = document.createElement('span');
  date_s.textContent = data.created_at
  date_s.className = 'date'
  ele.append(user_s);
  ele.append(action_s);
  ele.append(content_s);
  ele.append(date_s);
  ul.prepend(ele);
}

OmaApi.prototype.set_fin_btn = function(ele, data){
  that = this;
  if(data.finished){
    ele.className = 'rec'
    ele.textContent = 'R';
  }else{
    ele.className = 'fin'
    ele.textContent = 'V';
  }

  ele.onclick = function(){ 
    that.put_list_items({
      short_cut: window.location.href.match('/([a-zA-Z0-9_-]{24})')[1],
      ele: ele,
      id: data.id,
      finished: !data.finished,
      is_delete: data.is_delete 
    },function(){
    })
  } 
}

OmaApi.prototype.set_del_btn = function(ele, data){
  ele.className = 'del'
  ele.textContent = 'X'
  ele.onclick = function(){
    chk = confirm('Delete this Task?'); 
    if(chk){
      that.put_list_items({
        short_cut: window.location.href.match('/([a-zA-Z0-9_-]{24})')[1],
        ele: ele,
        id: data.id,
        finished: !data.finished,
        is_delete: true 
      },function(){

      })
    }
  } 
}

OmaApi.prototype.update_list_item = function(data){
  console.log(data);
  list = document.getElementsByClassName('items')[0]
  that = this;
  Array.from(list.children).forEach(function(e){
    if(e.dataset.listItemId == data.id){
      if(!data.is_delete){
        e.className = data.finished;
        btn_cls = data.finished ? 'fin' : 'rec'
        fin_btn = e.getElementsByClassName(btn_cls)[0];
        that.set_fin_btn(fin_btn, data);
        that.append_list_activity(data.log);
      }else{
        that.append_list_activity(data.log);
        e.remove();
      }
    }
  })
}

//////User Auth/Validations
OmaApi.prototype.set_user = function (user) {
  this.user = user
};

OmaApi.prototype.user_invalid = function (user) {
  return this.user['access_token'] == '' ? true : false
};

OmaApi.prototype.user_required = function (valid_callback, invalid_callback) {
  if(this.user_invalid()){
    invalid_callback();
  }else{
    valid_callback();
  }
};


//////Websockets
OmaApi.prototype.connect_channel = function(short_cut){
  if(this.list_channel){
    console.log('Unsubscribe existing channel');
    this.comsumer.subscriptions.remove(this.list_channel);
    this.comsumer = ActionCable.createConsumer('ws://' + this.host + ':' + this.port + this.cable);
    this.list_channel = null
  }
  this.list_channel = this.comsumer.subscriptions.create({ 
    channel: "ListChannel", 
    short_cut: short_cut, 
    access_token: this.user.access_token }, 
    {
      connected: function () {
        console.log("channel: connected");
      },
      disconnected: function () {
        console.log("channel: disconnected");
      },
      rejected: function () {
        console.log("channel: rejected");
      },
      received: function (res) {
        eval('window.app.oma.' + res.action + '(' + JSON.stringify(res.data) + ')');
      }
    }
  );
}
