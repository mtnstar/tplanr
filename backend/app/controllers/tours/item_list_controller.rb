class Tours::ItemListController < ApplicationController

  def create
    render status: :bad_request if tour.item_list

    create_tour_item_list
    render status: :ok
  end

  private

  def create_tour_item_list
    if params[:template_item_list_id]
      list = template_item_list.clone
    else
      ItemList.create!(tour_id: tour.id)
    end
  end

  def tour
    @tour ||= Tour.find(params[:id])
  end

  def template_item_list
    list =
      ItemList
      .where(user_id: [nil, current_user.id])
      .where(sport_kind: tour.sport_kind)
      .find(params[:template_item_list_id])
  end
  
  def template_item_list_id
    params[:template_item_list_id]
  end

end
