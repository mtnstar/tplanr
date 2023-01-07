class ItemList < ApplicationRecord
  has_many :item_list_items
  has_many :items, through: :item_list_items
  belongs_to :tour
  belongs_to :user

  enum :sport_kind, { alpine_summer: 0, climbing: 1, ski_tour: 2, mountain_bike: 3 }
end
