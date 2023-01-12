class Participation::Tours::ItemsController < ActionController::API
  include JSONAPI::ActsAsResourceController

  def context
    { participation_uid: params[:participation_uid] }
  end

end
