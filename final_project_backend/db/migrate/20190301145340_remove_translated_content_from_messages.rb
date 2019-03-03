class RemoveTranslatedContentFromMessages < ActiveRecord::Migration[5.2]
  def change
    remove_column :messages, :translated_content
  end
end
