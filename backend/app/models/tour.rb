class Tour < ApplicationRecord

  belongs_to :user

  enum :sport_kind, { alpine_summer: 0, climbing: 1, ski_tour: 2, mountain_bike: 3 }

  mount_uploader :avatar, TourAvatarUploader

end
