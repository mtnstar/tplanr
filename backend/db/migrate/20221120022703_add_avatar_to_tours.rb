class AddAvatarToTours < ActiveRecord::Migration[7.0]
  def change
    add_column :tours, :avatar, :string
  end
end
