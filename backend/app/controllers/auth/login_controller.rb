class Auth::LoginController < ApplicationController
  skip_before_action :authorize_request

  # POST /auth/login
  def create
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { data: { attributes: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                     first_name: @user.first_name }}}, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end
end
