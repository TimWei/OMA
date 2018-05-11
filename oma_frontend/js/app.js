window.app = {}
window.app.constants = {
	'auto_signout' : true
}
window.app.oma = new OmaApi({
    host: document.getElementsByName('oma-host')[0].content,
    port: document.getElementsByName('oma-port')[0].content,
    api_prefix: document.getElementsByName('oma-prefix')[0].content
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
        window.location.href = '/';
    });
    window.app.scene.active('loading')
    window.app.oma.get_lists(function(){
        window.app.scene.active('dashboard');
    });
})


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

// lists controll callback
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
        console.log('e')
        window.app.scene.active('dashboard');
    })
}
