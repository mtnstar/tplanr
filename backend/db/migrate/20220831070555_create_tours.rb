class CreateTours < ActiveRecord::Migration[7.0]
  def change
    create_table :tours do |t|
      t.text :description
      t.string :link
      t.string :label, null: false
      t.references :user
      t.integer :sport_kind, default: 0

      t.timestamps
    end
  end
end
