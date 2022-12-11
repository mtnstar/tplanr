class CreateSections < ActiveRecord::Migration[7.0]
    create_table :sections do |t|
      t.references :tour
      t.string :type, null: false
      t.string :label
      t.string :external_link
      t.text :details
      t.integer :distance_km
      t.integer :climb_up_meters
      t.integer :climb_down_meters
      t.date :date_at, null: false
      t.time :start_at
      t.time :end_at

      t.timestamps
    end

    add_index :sections, :start_at
    add_index :sections, :end_at
    add_index :sections, :date_at
end
