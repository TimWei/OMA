class Api::V1::ServerController < ApplicationController
	def ping
		@res[:data]['server'] = 'pong'
		send_res  
	end
end
