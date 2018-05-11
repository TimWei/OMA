
function OmaScene(opt={}) {
}

OmaScene.prototype.active = function (scene_id) {
	this.remove_active();
	document.getElementById(scene_id).classList.add('active')
};


OmaScene.prototype.remove_active = function () {
	let actived = document.getElementsByClassName('active')[0]
	if(actived){
		actived.classList.remove('active')
	}
};
