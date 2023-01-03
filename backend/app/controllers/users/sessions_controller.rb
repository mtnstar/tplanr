class Users::SessionsController < Devise::SessionsController
  include RackSessionsFix
  respond_to :json

  def respond_with(current_user, _opts = {})
    render json: {
      status: {
        code: 200, message: 'Logged in successfully.',
        data: { first_name: current_user.first_name }
      }
    }, status: :ok
  end  
  
  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last,
                               Rails.application.credentials.devise_jwt_secret_key!).first
      current_user = User.find(jwt_payload['sub'])
    end

    if current_user
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end
