window.app = {}
window.app.constants = {
	'auto_signout' : true
}
window.app.oma = new OmaApi();
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


// google auth stuff
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

