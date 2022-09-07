class ApplicationController < ActionController::Base

  include JSONAPI::ActsAsResourceController

  # before_action :authenticate_user!

  # CSRF tokens are not required with api only
  skip_before_action :verify_authenticity_token

end
