class CreateActionLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :action_logs do |t|
      t.integer :user_id
      t.string :action
      t.string :content
      t.integer :todo_list_id
      t.integer :logable_id
      t.string :logable_type
      t.timestamps
    end
  	add_index :action_logs, :user_id
  	add_index :action_logs, :todo_list_id
  end
end
