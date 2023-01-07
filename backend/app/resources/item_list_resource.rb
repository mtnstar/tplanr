class ItemListResource < JSONAPI::Resource
  attributes :template_label

  filter :sport_kind

  def self.records(options = {})
    user_id = options[:context][:current_user].id
    ItemList.where(tour_id: nil, user_id: [nil, user_id])
  end

  before_save do
    @model.user_id = context[:current_user].id if @model.new_record?
  end
end
