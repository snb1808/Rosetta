Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :show]
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
      get '/users', to: 'users#index'
      resources :userchats
      resources :chats
      resources :messages, only: [:index, :create]
      resources :languages
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
