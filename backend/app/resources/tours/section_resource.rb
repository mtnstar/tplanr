class Tours::SectionResource < JSONAPI::Resource
  before_create :assign_tour_id

  attributes :type, :label, :external_link,
    :details, :distance_km,
    :created_at, :updated_at, :climb_up_meters,
    :climb_down_meters, :start_at, :end_at

  model_hint model: Section::Transport, resource: self
  model_hint model: Section::Stage, resource: self
  model_hint model: Section::Meal, resource: self
  model_hint model: Section::Lodging, resource: self

  filters :tour_id

  def self.updatable_fields(context)
    super - [:created_at, :updated_at]
  end

  def self.creatable_fields(context)
    super - [:created_at, :updated_at]
  end

  def self.default_sort
    [{field: 'start_at', direction: :asc}]
  end

  private

  def assign_tour_id
    @model.tour_id = context[:tour_id]
  end

end
