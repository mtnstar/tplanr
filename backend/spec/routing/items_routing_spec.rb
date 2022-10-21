require "rails_helper"

RSpec.describe ItemsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/items").to route_to("items#index")
    end

    it "routes to #show" do
      expect(get: "/api/items/1").to route_to("items#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/api/items").to route_to("items#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/items/1").to route_to("items#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/api/items/1").to route_to("items#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/items/1").to route_to("items#destroy", id: "1")
    end
  end
end
