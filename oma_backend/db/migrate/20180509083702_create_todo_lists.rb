class CreateTodoLists < ActiveRecord::Migration[5.0]
  def change
    create_table :todo_lists do |t|
      t.string :name
      t.string :short_cut
      t.integer :owner_id
      t.string :lock_version

      t.timestamps
    end
    add_index :todo_lists, :owner_id
  end
end
