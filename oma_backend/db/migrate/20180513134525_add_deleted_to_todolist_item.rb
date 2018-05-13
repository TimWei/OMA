class AddDeletedToTodolistItem < ActiveRecord::Migration[5.0]
  def change
  	add_column :todo_list_items, :is_delete, :boolean, default: false
  end
end
