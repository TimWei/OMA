# == Schema Information
#
# Table name: participants
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  list_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_participants_on_list_id  (list_id)
#  index_participants_on_user_id  (user_id)
#

class Participant < ApplicationRecord
	belongs_to :user
	belongs_to :list, class_name: 'TodoList'
end
