class ApplicationController < ActionController::API
	after_action :set_cors
	def send_res opt={}
		result = {}
		result['status'] = opt[:status] || 0
		result['error'] = opt[:error] || ''
		result['msg'] = opt[:msg] || ''
		result['data'] = opt[:data]
		render json: result 
	end

	def set_cors
    	headers['Access-Control-Allow-Origin'] = '*'
    	headers['Access-Control-Request-Method'] = '*'
	end

	def access_token_exsit?
		params[:access_token] && !params[:access_token].empty? ? true : false
	end

	def set_user
		@user = User.find_by_token params[:access_token] 
		if @user 
			@user
		else 
			send_res error: true, msg: 'user not found' 
		end
	end
end
