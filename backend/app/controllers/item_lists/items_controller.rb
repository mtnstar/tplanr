class ItemLists::ItemsController < ApplicationController

  def context
    super.merge(item_list_id: params[:item_list_id])
  end

end
