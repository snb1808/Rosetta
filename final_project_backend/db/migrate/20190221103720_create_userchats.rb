class CreateUserchats < ActiveRecord::Migration[5.2]
  def change
    create_table :userchats do |t|
      t.integer :user_id
      t.integer :chat_id

      t.timestamps
    end
  end
end
