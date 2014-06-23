
Rails.application.routes.draw do
  
  #TODO: Check whether not including the below route affects some other functionality
  #root :to => "catalog#index"

  # get '/data', to: 'catalog#index'

  #allow any characters for id (since SOLR IDs are URIs)
  blacklight_for:catalog, :constraints => {:id => /|.*/}

  #home page - different from primary catalog interface
  root 'pages#home'

  #experimenting with views and controllers within application for static html pages, SPARQL queries, and CMS integration
  get 'pages/calendar(/:year(/:month))', to: 'pages#calendar', as: 'calendar'
  get 'pages/test2'


  get 'highlights/feature'
  get 'proxy/data'

  #blacklight_for :catalog

  #Get an error when we try to get constraints below with regular search
  #blacklight_for :catalog, :constraints => { :id => ALLOW_SOLR_DOCIDS, :format => false }
  #, :constraints => { :id => ALLOW_SOLR_DOCIDS, :format => false }
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  

   #comfy_route :cms_admin, :path => '/admin'

  # Make sure this routeset is defined last
   #comfy_route :cms, :path => '/', :sitemap => false

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
