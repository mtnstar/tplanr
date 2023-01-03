class ApplicationController < ActionController::API

  attr_reader :current_user

  include JSONAPI::ActsAsResourceController
  include Authentication

  def context
    { current_user: current_user }
  end

end
