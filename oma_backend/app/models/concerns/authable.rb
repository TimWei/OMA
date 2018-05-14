require 'net/http'
module Authable
	def auth opt={}
		raise 'empty provider' if opt[:provider].nil? || opt[:provider].empty?
		user_info = auth_by_provider opt[:provider], opt[:auth_code]
		record = self.where(email:  user_info.email, sub: user_info.key).first_or_create
		record.update(name: user_info.name)
		record
	end
	private

	def auth_by_provider provider, auth_code
		case provider
		when 'google'
			Provider::Google.new auth_code
		#TODOs
		#when :twitter
		#	Provider::Twitter.new auth_code
		end
	end
end