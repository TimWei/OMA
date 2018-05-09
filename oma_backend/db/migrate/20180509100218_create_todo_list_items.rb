class CreateTodoListItems < ActiveRecord::Migration[5.0]
  def change
    create_table :todo_list_items do |t|
      t.integer :todo_list_id
      t.text :content
      t.boolean :finished, default: false
      t.string :lock_version

      t.timestamps
    end
  	add_index :todo_list_items, :todo_list_id
  end
end
