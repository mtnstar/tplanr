require 'rails_helper'

RSpec.describe "/auth/login", type: :request do
  describe "POST #create" do
    it "returns valid token for correct email/password" do
      post auth_login_url, params: { email: 'leiter@example.com', password: 'p' }
      expect(response).to be_successful

      user_attrs = json_data['attributes']
      expect(user_attrs['token']).to be_present
      expect(user_attrs['first_name']).to eq('Gabe')
    end

    it "returns unauthorized for invalid email/password" do
      post auth_login_url, params: { email: 'ghost@example.com', password: 'pw' }
      expect(response).to be_unauthorized
    end
  end
end
