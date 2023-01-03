class ItemResource < JSONAPI::Resource

  attributes :label_de, :description_de, :item_category

  filters :label_de, :item_category
  filter :label_de, apply: ->(records, value, _options) {
    value = value.first.downcase + '%%'
    records.where('LOWER(label_de) LIKE :value', value: value)
  }

  def self.records(options = {})
    user_id = options[:context][:current_user].id
    Item.where(user_id: [user_id, nil])
  end

  def self.updatable_fields(context)
    super - [:created_at, :updated_at, :item_category]
  end

  def self.creatable_fields(context)
    super - [:created_at, :updated_at]
  end

  before_save do
    @model.user_id = context[:current_user].id if @model.new_record?
  end
end
