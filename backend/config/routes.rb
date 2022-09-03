Rails.application.routes.draw do
  resources :item_categories
  resources :items

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  resources :tours

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
