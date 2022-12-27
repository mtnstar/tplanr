class Item < ApplicationRecord
  enum :item_category, { wearables: 0, gear: 1, food: 2, electronics: 3, other: 4 }
end
