Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :show, :update]
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
      get '/users', to: 'users#index'
      get '/contact_list', to: 'users#contact_list'
      resources :userchats
      resources :chats
      resources :messages, only: [:index, :create]
      post '/last_message', to: 'messages#show'
      resources :languages
      resources :translations
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
