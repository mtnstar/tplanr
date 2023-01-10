class ItemListResource < JSONAPI::Resource
  attributes :template_label

  filter :sport_kind

  def self.records(options = {})
    user_id = options[:context][:current_user].id
    ItemList.where(tour_id: nil, user_id: [nil, user_id])
  end

  before_save do
    if @model.new_record?
      @model = init_model
      @model.user_id = context[:current_user].id 
    end
  end

  private

  def init_model
    return @model unless tour_item_list_id

    list = ItemList.find(tour_item_list_id).clone
    list.sport_kind = list.tour.sport_kind
    list.tour_id = nil
    list.template_label = @model.template_label
    list
  end

  def tour_item_list_id
    context[:tour_item_list_id]
  end

end
