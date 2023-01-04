Rails.application.routes.draw do
  scope :api do
    resources :item_categories
    resources :items

    resources :tours do
      resources :sections, controller: 'tours/sections'
      resources :items, controller: 'tours/items'
    end

    post '/auth/login', to: 'auth/login#create'
  end
end
