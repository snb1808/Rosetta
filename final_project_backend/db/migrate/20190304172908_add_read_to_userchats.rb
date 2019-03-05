class AddReadToUserchats < ActiveRecord::Migration[5.2]
  def change
    add_column :userchats, :read, :boolean
  end
end
