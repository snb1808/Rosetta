class RemoveLanguageIdFromMessages < ActiveRecord::Migration[5.2]
  def change
    remove_column :messages, :language_id
  end
end
