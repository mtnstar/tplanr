class Tours::ItemResource < JSONAPI::Resource
  model_name 'ItemListItem'

  attributes :label_de, :description_de, :optional, :item_category, :count, :tour_id, :item_id

  filters :tour_id

  delegate :item_category, :label_de, :description_de, to: :'@model.item'

  def self.updatable_fields(context)
    [:optional, :count]
  end

  def self.creatable_fields(context)
    [:optional, :count, :item_id]
  end

  def tour_id
    @model.item_list.tour_id
  end

  before_save do
    if @model.new_record?
      item_list_id = Tour.find(context[:tour_id]).item_list.id
      @model.item_list_id = item_list_id 
    end
  end

end
