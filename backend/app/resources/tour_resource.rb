class TourResource < JSONAPI::Resource
  attributes :label, :description, :link, :created_at, :updated_at
end
