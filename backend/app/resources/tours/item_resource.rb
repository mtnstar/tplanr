class Tours::ItemResource < JSONAPI::Resource
  model_name 'ItemListItem'

  attributes :label_de, :description_de, :optional, :item_category

  filters :tour_id

  delegate :item_category, :label_de, :description_de, to: :'@model.item'

  def self.updatable_fields(context)
    [:optional, :count]
  end

  def self.creatable_fields(context)
    [:optional, :count]
  end

  def tour_id
    item_list.tour_id
  end

end
