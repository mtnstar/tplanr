Rails.application.routes.draw do
  scope :api do
    resources :item_categories
    resources :items

    devise_for :users, controllers: {
      sessions: 'users/sessions'
    }

    resources :tours
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
