Rails.application.routes.draw do
  scope :api do
    post '/auth/login', to: 'auth/login#create'

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

    scope :participation do
      get '/tours/:participation_uid/items', to: 'participation/tours/items#index'
    end
  end
end
