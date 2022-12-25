class SectionsController < ApplicationController

  def context
    super.merge(tour_id: params[:tour_id])
  end

end
