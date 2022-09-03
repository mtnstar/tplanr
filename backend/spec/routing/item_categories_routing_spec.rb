require "rails_helper"

RSpec.describe ItemCategoriesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/item_categories").to route_to("item_categories#index")
    end

    it "routes to #show" do
      expect(get: "/item_categories/1").to route_to("item_categories#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/item_categories").to route_to("item_categories#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/item_categories/1").to route_to("item_categories#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/item_categories/1").to route_to("item_categories#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/item_categories/1").to route_to("item_categories#destroy", id: "1")
    end
  end
end
