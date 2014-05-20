ALLOW_SOLR_DOCIDS ||= /[a-zA-Z0-9_.:%\/\/*]*/
#ALLOW_SOLR_DOCIDS ||= /[*]*/
TeealBlacklight::Application.routes.draw do
  get "test_proxy_controller/hello"
  root :to => "catalog#index"
  #get 'catalog/:id' => 'catalog#show',  :constraints => { :id => ALLOW_SOLR_DOCIDS, :format => false }
  #Allow everything including empty string for id
  get "catalog/:id" => "catalog#show",  :constraints => {:id => /.*/}
  #get "catalog/:id" => "catalog#show",  :constraints => {:id => /|[a-zA-Z0-9_.:\/\/*]*/}
  #get "catalog/:id/DocId" => 'catalog#specialId'
  
  blacklight_for:catalog
  
  #blacklight_for :catalog

  #Get an error when we try to get constraints below with regular search
  #blacklight_for :catalog, :constraints => { :id => ALLOW_SOLR_DOCIDS, :format => false }
  #, :constraints => { :id => ALLOW_SOLR_DOCIDS, :format => false }
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

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
