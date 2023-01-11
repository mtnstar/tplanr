class Tour < ApplicationRecord

  belongs_to :user
  has_one :item_list
  has_many :item_list_items, through: :item_list
  has_many :items, through: :item_list_items

  enum :sport_kind, { alpine_summer: 0, climbing: 1, ski_tour: 2, mountain_bike: 3 }

  mount_base64_uploader :avatar, TourAvatarUploader

  attr_readonly :sport_kind
  attr_readonly :participation_uid

  before_create :generate_participation_uid


  private

  def generate_participation_uid
    participation_uid = SecureRandom.hex[0..8]
  end

end
