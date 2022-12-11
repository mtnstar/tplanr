class CreateTours < ActiveRecord::Migration[7.0]
  def change
    create_table :tours do |t|
      t.text :description
      t.string :external_link
      t.string :label, null: false
      t.references :user
      t.integer :sport_kind, default: 0
      t.date :start_at, null: false
      t.date :end_at, null: false

      t.timestamps
    end
  end
end
