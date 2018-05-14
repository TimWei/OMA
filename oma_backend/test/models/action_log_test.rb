# == Schema Information
#
# Table name: action_logs
#
#  id           :integer          not null, primary key
#  user_id      :integer
#  action       :string
#  content      :string
#  todo_list_id :integer
#  logable_id   :integer
#  logable_type :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_action_logs_on_todo_list_id  (todo_list_id)
#  index_action_logs_on_user_id       (user_id)
#

require 'test_helper'

class ActionLogTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
