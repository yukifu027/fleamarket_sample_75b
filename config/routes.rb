Rails.application.routes.draw do
  devise_for :users
  root "items#index"
  resources :users do
    member do
      get 'logout'
    end
  end
  resources :items do
    collection do 
      get 'confirm'
    end
  end
  resources :credit_cards
end
