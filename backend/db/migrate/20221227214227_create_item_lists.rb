class CreateItemLists < ActiveRecord::Migration[7.0]
  def change
    create_table :item_lists do |t|
      t.references :tour
      t.integer :sport_kind, default: 0
      t.timestamps
    end

    create_table :item_list_items do |t|
      t.references :item
      t.references :item_list
      t.boolean :optional, default: false
      t.integer :count, default: 1
    end
  end
end
