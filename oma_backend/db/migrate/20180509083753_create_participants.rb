class CreateParticipants < ActiveRecord::Migration[5.0]
  def change
    create_table :participants do |t|
      t.integer :user_id
      t.integer :list_id

      t.timestamps
    end
	add_index :participants, :user_id
  	add_index :participants, :list_id
  end
end
