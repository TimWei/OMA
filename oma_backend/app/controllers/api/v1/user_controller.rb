class Api::V1::UserController < ApplicationController
	def auth
		email   	= params[:email]
		id_token    = params[:id_token]
		provider    = parmas[:provider] 
		user_info   = User.auth(email: email, provider: provider, auth_code: id_token) 
		user_info = {}
		user_info['id'] = user.id
		user_info['access_token'] = user.token
		send_res data: user_info 
	end
end
