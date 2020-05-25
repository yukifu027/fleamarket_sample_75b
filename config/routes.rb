Rails.application.routes.draw do
  root "items#index"
  resources :users
  resources :items do
    collection do 
      get 'confirm'
    end
  end
  resources :credit_cards
end
