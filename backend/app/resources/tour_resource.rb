class TourResource < JSONAPI::Resource
  attributes :label, :description, :external_link,
    :created_at, :updated_at, :avatar,
    :start_at, :end_at, :sport_kind,
    :item_list_id

  filter :sport_kind

  def self.updatable_fields(context)
    super - [:user_id, :create_at, :updated_at, :item_list_id]
  end

  def self.creatable_fields(context)
    super - [:user_id, :create_at, :updated_at, :item_list_id]
  end

  before_save do
    @model.user_id = context[:current_user].id if @model.new_record?
  end

  def item_list_id
    @model.item_list.try(:id)
  end

end
