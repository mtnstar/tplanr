class Tours::ItemListController < ApplicationController

  def create
    tour.item_list.create!
  end

  private

  def tour
    Tour.find(params[:tour_id])
  end

end
