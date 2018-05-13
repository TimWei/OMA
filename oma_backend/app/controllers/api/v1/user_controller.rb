class Api::V1::UserController < ApplicationController
	def auth
		user = User.auth(email: params[:email], provider: params[:provider], auth_code: params[:id_token]) 
		user_info = {}
		user_info['access_token'] = user.token
		user_info['email'] = user.email
		user_info['name'] = user.name
		send_res data: user_info 
	end
end
