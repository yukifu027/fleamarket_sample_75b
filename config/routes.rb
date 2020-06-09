Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
  }
  devise_scope :user do
    get 'profiles', to: 'users/registrations#new_profile'
    post 'profiles', to: 'users/registrations#create_profile'
    get 'sending_destinations', to: 'users/registrations#new__sending_destination'
    post 'sending_destinations', to: 'users/registrations#create_sending_destination'
  end


  root "items#index"

  resources :users do
    member do
      get 'logout'
    end
  end
  namespace :items do
    resources :searches, only: :index
  end
  resources :items do  
    member do 
      get 'confirm'
      post 'pay'
    end
    collection do
      get 'delete'
      get 'get_category_children', defaults: { format: 'json' }
      get 'get_category_grandchildren', defaults: { format: 'json' }
    end
  end
  resources :credit_cards
end
