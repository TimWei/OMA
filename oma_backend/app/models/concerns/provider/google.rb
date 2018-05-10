# TIM: Oauth2 auth code have its expiration time, we should using a cache system here likes Redis or Memcache. prevent HTTP requests before it expired for improving performance.
# 
require 'certified'
class Provider::Google
	def initialize auth_code
		raise 'auth_code' if auth_code.nil? || auth_code.empty?
		auth_uri = URI('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + auth_code)
		@data = JSON.parse Net::HTTP.get(auth_uri)
		validation
	end

	def key
		@data['sub']
	end

	def name
		@data['name']
	end

	def validation
		raise 'invalid user' if @data['sub'].nil?
	end
end