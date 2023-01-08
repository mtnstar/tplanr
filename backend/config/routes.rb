Rails.application.routes.draw do
  scope :api do
    resources :item_categories
    resources :items
    resources :item_lists do
      resources :items, controller: 'item_lists/items'
    end

    resources :tours do
      resources :sections, controller: 'tours/sections'
      resources :items, controller: 'tours/items'
      member do
        post 'item_list', to: 'tours/item_list#create'
      end
    end

    post '/auth/login', to: 'auth/login#create'
  end
end
