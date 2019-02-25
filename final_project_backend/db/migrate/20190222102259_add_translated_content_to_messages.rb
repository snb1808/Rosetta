class AddTranslatedContentToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :translated_content, :string
  end
end
