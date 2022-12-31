class Tours::ItemResource < JSONAPI::Resource
  model_name 'ItemListItem'

  attributes :label_de, :description_de, :optional, :item_category, :count, :tour_id, :item_id

  filters :tour_id

  delegate :item_category, :label_de, :description_de, to: :'@model.item'

  def self.updatable_fields(context)
    [:optional, :count, :item_id]
  end

  def self.creatable_fields(context)
    [:optional, :count, :item_id]
  end

  def self.records(options = {})
    item_list_id = tour_item_list_id(options[:context][:tour_id])
    ItemListItem.where(item_list_id: item_list_id)
  end

  def tour_id
    @model.item_list.tour_id
  end

  def self.tour_item_list_id(tour_id)
    ItemList.find_by(tour_id: tour_id).id
  end

  before_save do
    if @model.new_record?
      @model.item_list_id = self.class.tour_item_list_id(context[:tour_id])
    end
  end

end
