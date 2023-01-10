class ItemListsController < ApplicationController
  def context
    super.merge(tour_item_list_id: params[:tour_item_list_id])
  end

end
