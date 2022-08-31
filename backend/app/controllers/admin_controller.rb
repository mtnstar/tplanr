class AdminController < ApplicationController

  before_action :assert_admin

  private

  def assert_admin
    unless current_user.admin?
      render status: :unauthorized
    end
  end
end
