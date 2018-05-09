Rails.application.routes.draw do
	mount ActionCable.server => '/cable'
	
	namespace :api do
		namespace :v1 do
			scope 'server' do
				#checking server status
				get 'ping' => 'server#ping'
			end

			scope 'users' do
				post '/auth' => 'user#auth'
			end
			
			scope 'todo_lists' do
				#get room list
				get '/' => 'todo_list#index'
				#create room
				post '/' => 'todo_list#create'
				#enter room
				get '/:todo_list_id' => 'todo_list#show'
			end

		end
	end
end
