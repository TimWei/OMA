class Api::V1::ServerController < AuthController
	def ping
		res = {}
		res['server'] = 'pong'

		send_res data: res
	end
end
