class ItemListItem < ApplicationRecord
  belongs_to :item
  belongs_to :item_list
end
