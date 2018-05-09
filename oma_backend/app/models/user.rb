# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  name       :string
#  sub        :string
#  email      :string
#  token      :string
#  color      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ApplicationRecord
	has_secure_token
	has_many :participants
	has_many :lists, through: :participants
	after_create :set_color
	extend Authable
	
	def set_color
		self.color = self.token[0..5].each_char.map{|t| (t.ord * 7 % 16).to_s(16) }.join
		self.save
	end
end

