class CreateItemCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :item_categories do |t|
      t.string :label_de

      t.timestamps
    end

    add_index :item_categories, :label_de
  end
end
