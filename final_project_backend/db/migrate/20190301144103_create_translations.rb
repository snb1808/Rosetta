class CreateTranslations < ActiveRecord::Migration[5.2]
  def change
    create_table :translations do |t|
      t.references :message
      t.references :user
      t.string :content

      t.timestamps
    end
  end
end
