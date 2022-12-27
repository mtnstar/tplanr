class ItemList < ApplicationRecord
  has_many :item_list_items
  has_many :items, through: :item_list_items
  belongs_to :tour
end
