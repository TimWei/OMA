window.app = {}
window.app.constants = {
	'auto_signout' : true
}
window.app.oma = new OmaApi({
    host: document.getElementsByName('oma-host')[0].content,
    port: document.getElementsByName('oma-port')[0].content,
    api_prefix: document.getElementsByName('oma-prefix')[0].content,
    cable: document.getElementsByName('oma-cable')[0].content
});
window.app.scene = new OmaScene();

// routing
window.app.router = new FrontRouter();
window.app.router.route('/',function(e){
    console.log("===HELLO UNDER WORLD===")
    window.location.href= '#'
    window.app.scene.active('login')
})

window.app.router.route('dashboard',function(e){
    window.app.oma.user_required(function(){
        window.app.scene.active('loading')
        window.app.oma.get_lists(function(){
            window.app.scene.active('dashboard');
        });
    },function(){
        window.location.href = '/';
    });
})

window.app.router.route('list/[a-zA-Z0-9_-]{24}',function(e){
    window.app.oma.user_required(function(){
        window.app.scene.active('loading');
        window.app.oma.get_list_items(window.location.href.match('list/([a-zA-Z0-9_-]{24})')[1] ,function(){
            window.app.scene.active('list');
        });
    },function(){
        window.location.href = '/';
    });
})

window.app.router.route('invite/[a-zA-Z0-9]{24}',function(e){
    window.app.scene.active('loading')
    window.app.oma.user_required(function(){
        window.app.oma.invited(get_short_cut(),function(){
            window.location.href = '#list/' + get_short_cut()
        })
    },function(){
        gapi.auth2.getAuthInstance().signIn().then(function(googleUser){ 
            var provider = 'google'
            var profile = googleUser.getBasicProfile();
            var email = profile.getEmail();
            var id_token = googleUser.getAuthResponse().id_token;
            window.app.oma.signin({
                provider: provider,
                email: email,
                id_token: id_token,
            },function(){
                window.app.oma.invited(get_short_cut(),function(){
                    window.location.href = '#list/' + get_short_cut()
                })
            })
        })
    })
})
// helper 
function get_short_cut(){
    return window.location.href.match('/([a-zA-Z0-9_-]{24})')[1]
}

// google auth callback
window.onbeforeunload = function(e){
    if(window.app.constants.auto_signout){
      gapi.auth2.getAuthInstance().signOut();
    }
};
function google_signin(googleUser){
    var provider = 'google'
    var profile = googleUser.getBasicProfile();
    var email = profile.getEmail();
    var id_token = googleUser.getAuthResponse().id_token;
    window.app.oma.signin({
    	provider: provider,
    	email: email,
    	id_token: id_token,
    },function(){
        window.location.href ="#dashboard"
    })
}

// lists control callback
function open_new_form(){
    window.app.oma.toggle("new_form","list-item");
    window.app.oma.toggle("new","none");
}
function close_new_form(){
    window.app.oma.toggle("new_form","none");
    window.app.oma.toggle("new","list-item");
}
function new_form_submit(){
    close_new_form();
    window.app.scene.active('loading');
    window.app.oma.post_lists(window.new_form_name.value, function(e){
        window.app.scene.active('dashboard');
    })
}

// list items control callback
function open_new_item_form(){
    window.app.oma.toggle("new_item_form","list-item");
    window.app.oma.toggle("new_item","none");
}
function close_new_item_form(){
    window.app.oma.toggle("new_item_form","none");
    window.app.oma.toggle("new_item","list-item");
}
function new_item_form_submit(){
    close_new_item_form();
    window.app.oma.post_list_items({
        short_cut: get_short_cut(),
        content: window.new_item_form_name.value
    }, function(e){
        window.new_item_form_name.value = '';
    })
}

// activities control callback
function activity_toggle(){
    ele = document.getElementsByClassName('activity')[0]
    if(ele.classList.contains('active')){
        ele.classList.remove('active')
    }else{
        ele.classList.add('active')
    }
}