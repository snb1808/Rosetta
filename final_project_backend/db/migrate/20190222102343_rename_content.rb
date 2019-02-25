class RenameContent < ActiveRecord::Migration[5.2]
  def change
    rename_column :messages, :content, :original_content
  end
end
