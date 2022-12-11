class TourResource < JSONAPI::Resource
  attributes :label, :description, :external_link,
    :created_at, :updated_at, :avatar,
    :start_at, :end_at, :sport_kind

  filter :sport_kind

  def self.updatable_fields(context)
    super - [:user_id, :create_at, :updated_at]
  end

  def self.creatable_fields(context)
    super - [:user_id, :create_at, :updated_at]
  end

  before_save do
    @model.user_id = context[:current_user].id if @model.new_record?
  end

end
