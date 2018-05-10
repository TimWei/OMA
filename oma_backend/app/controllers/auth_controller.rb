class AuthController < ApplicationController
	before_action :set_user
	
	private
	def set_user
		@user = User.find_by_token params[:access_token] 
		if @user 
			@user
		else 
			send_res error: true, msg: 'user not found' 
		end
	end	
end

