class ApplicationController < ActionController::API
	before_action :set_res

	def access_token_exsit?
		params[:access_token] && !params[:access_token].empty? ? true : false
	end

	private
	def send_res opt={}
		result = {}
		result['status'] 	= opt[:status] 	|| @res[:status] 
		result['error'] 	= opt[:error]	|| @res[:error]
		result['msg'] 		= opt[:msg]  	|| @res[:msg]
		result['data'] 		= opt[:data]	|| @res[:data]
		render json: result 
	end

	def set_res
		@res  			= {}
		@res[:data] 	= {}
		@res[:status] 	= 0
		@res[:error] 	= 0
		@res[:msg] 		= ''
	end

end
