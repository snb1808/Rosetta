class AddFlagsToLanguages < ActiveRecord::Migration[5.2]
  def change
    add_column :languages, :flag, :string
  end
end
