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
  resources :items do
    member do 
      get 'confirm'
      post 'pay'
    end
  end
  resources :credit_cards
end
