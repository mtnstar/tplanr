class TourResource < JSONAPI::Resource
  attributes :label, :description, :link, :created_at, :updated_at

  filter :sport_kind

  def self.updatable_fields(context)
    super - [:user_id]
  end

  def self.creatable_fields(context)
    super - [:user_id]
  end

end
