Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :tags do
        get '/:tag_id/tasks/index', to: 'tasks#index'
        post '/:tag_id/tasks/create', to: 'tasks#create'
        get '/:tag_id/task/show/:id', to: 'tasks#show'
        delete '/:tag_id/task/destroy/:id', to: 'tasks#destroy'
        get '/:tag_id/task/markCompleted/:id', to: 'tasks#markCompleted'
        get '/:tag_id/task/markIncomplete/:id', to: 'tasks#markIncomplete'
      end
    end
  end
  namespace :api do
    namespace :v1 do
      get 'tags/index'
      post 'tags/create'
      get 'tag/show/:id', to: 'tags#show'
      delete 'tag/destroy/:id', to: 'tags#destroy'
      get 'tag/markCompleted/:id', to: 'tags#markCompleted'
      get 'tag/markIncomplete/:id', to: 'tags#markIncomplete'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
