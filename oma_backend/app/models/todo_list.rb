# == Schema Information
#
# Table name: todo_lists
#
#  id           :integer          not null, primary key
#  name         :string
#  short_cut    :string
#  owner_id     :integer
#  lock_version :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_todo_lists_on_owner_id  (owner_id)
#

class TodoList < ApplicationRecord
	belongs_to :owner, class_name: 'User'
	has_many :participants, foreign_key: :list_id
	has_many :users, through: :participants
	has_many :items, class_name: 'TodoListItem'
	has_many :action_logs
	has_many :history, as: :logable, class_name: 'ActionLog'
	has_secure_token :short_cut

	def logged
		self.name
	end
end
