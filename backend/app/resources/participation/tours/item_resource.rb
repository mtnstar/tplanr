class Participation::Tours::ItemResource < JSONAPI::Resource
  model_name 'ItemListItem'

  attributes :label_de, :description_de, :optional, :item_category, :count, :item_id

  delegate :item_category, :label_de, :description_de, to: :'@model.item'

  def self.records(options = {})
    tour = Tour.find_by(participation_uid: options[:context][:participation_uid])
    tour.item_list.item_list_items
  end
end
