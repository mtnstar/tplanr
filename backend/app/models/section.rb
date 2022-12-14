class Section < ApplicationRecord

  belongs_to :tour

  attr_readonly :type

  validates_comparison_of :start_at, greater_than: :tour_start_at, smaller_than: :tour_end_at
  validates_comparison_of :end_at, greater_than: :start_at, smaller_than: :tour_end_at

  private

  def tour_start_at
    tour.start_at
  end

  def tour_end_at
    tour.end_at
  end

end
