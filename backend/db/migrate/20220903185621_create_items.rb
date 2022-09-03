class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :label_de, null: false
      t.text :description_de
      t.references :user
      t.references :tour

      t.timestamps
    end

    add_index :items, :label_de
  end
end
