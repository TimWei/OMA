# == Schema Information
#
# Table name: todo_list_items
#
#  id           :integer          not null, primary key
#  todo_list_id :integer
#  content      :text
#  finished     :boolean
#  lock_version :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_todo_list_items_on_todo_list_id  (todo_list_id)
#

class TodoListItem < ApplicationRecord
	belongs_to :todo_list
end
