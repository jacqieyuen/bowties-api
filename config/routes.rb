Rails.application.routes.draw do

  namespace :api do
    resources :bowties, :defaults => { :format => 'json' }
  end

  resources :bowties

end
