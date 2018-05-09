class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :sub
      t.string :email
      t.string :token
      t.string :color

      t.timestamps
    end
  end
end
