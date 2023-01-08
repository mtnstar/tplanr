class ItemLists::ItemResource < JSONAPI::Resource
  model_name 'ItemListItem'

  attributes :label_de, :description_de, :optional, :item_category, :count, :item_list_id, :item_id

  filters :item_list_id

  delegate :item_category, :label_de, :description_de, to: :'@model.item'

  def self.updatable_fields(context)
    [:optional, :count, :item_id]
  end

  def self.creatable_fields(context)
    [:optional, :count, :item_id]
  end

  def self.records(options = {})
    item_list_id = options[:context][:item_list_id]
    ItemListItem.where(item_list_id: item_list_id)
  end

  before_save do
    if @model.new_record?
      @model.item_list_id = context[:item_list_id]
    end
  end

end
