Rails.application.routes.draw do
	mount ActionCable.server => '/cable'
	
	namespace :api do
		namespace :v1 do
			scope 'server' do
				#checking server status
				get '/ping' => 'server#ping'
			end

			scope 'users' do
				post '/auth' => 'user#auth'
			end
			
			scope 'todo_lists' do
				get 	'/' => 'todo_list#index'
				post 	'/' => 'todo_list#create'
				post 	'/invite' => 'todo_list#invite'
				
				scope '/:short_cut' do 
					get		'/items'	 => 'todo_list_item#index'
					post 	'/items'	 => 'todo_list_item#create'
					put 	'/items/:id' => 'todo_list_item#update'
				end
			end

		end
	end
end
