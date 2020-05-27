Rails.application.routes.draw do
  devise_for :users
  root "items#index"
  resources :users
  resources :items ,except: :show do
    collection do 
      get 'confirm'
    end
  end
  resources :credit_cards
end
