class ItemListItem < ApplicationRecord
  belongs_to :item
  belongs_to :item_list

  attr_readonly :item_list_id
  attr_readonly :item_id
end
