class SectionResource < JSONAPI::Resource
  attributes :type, :label, :external_link,
    :details, :distance_km,
    :created_at, :updated_at, :climb_up_meters,
    :climb_up_meters, :start_at, :end_at

  model_hint model: Section::Transport, resource: self
  model_hint model: Section::Stage, resource: self
  model_hint model: Section::Meal, resource: self
  model_hint model: Section::Lodging, resource: self

  filters :tour_id

  def self.updatable_fields(context)
    super - [:tour_id, :create_at, :updated_at]
  end

  def self.creatable_fields(context)
    super - [:create_at, :updated_at]
  end

end
