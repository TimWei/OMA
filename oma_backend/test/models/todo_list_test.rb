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

require 'test_helper'

class TodoListTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
