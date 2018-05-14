class Api::V1::TodoListItemController < AuthController
	before_action :set_list
	def index
		@res[:data][:list] = {
			name: @list.name,
			short_cut: @list.short_cut,
			items: @list.items.active.map{|t| {id: t.id, content: t.content, finished: t.finished, is_delete: t.is_delete} },
			history: @list.action_logs.sort_by{|t| t.created_at }.map{|t| {
					user: t.user,
					action: t.action,
					content: t.content,
					created_at: t.created_at.strftime("%Y-%m-%d %H:%M:%S")
				}}
		}
		send_res 
	end

	def create
		item = TodoListItem.new(todo_list: @list, content: params[:content])
		item.finished = false
		if item.save!
			log = ActionLog.create(user: @user, todo_list: @list, action: 'create', content: item.content, logable: item)
			ActionCable.server.broadcast "list_#{@short_cut}",action: 'append_list_item', data: {
				id: item.id,
				content: item.content,
				finished: item.finished,
				is_delete: item.is_delete,
				log: {
					user: log.user,
					action: log.action,
					content: log.content,
					created_at: log.created_at.strftime("%Y-%m-%d %H:%M:%S")
				}
			}

			@res[:data][:item] = {
				id: item.id,
				content: item.content,
				finished: item.finished,
				is_delete: item.is_delete
			}
		else
			@res[:error] = 1
			@res[:msg]	 = 'list-item creating failed'
		end
		send_res
	end

	def update
		item = @list.items.active.where(id: params[:id]).first
		item.finished = params[:finished]
		item.is_delete = params[:is_delete]
		if item.save!
			if params[:is_delete]
				log = ActionLog.create(user: @user, todo_list: @list, action: 'delete', content: item.content, logable: item)
			else	
				if params[:finished]
					log = ActionLog.create(user: @user, todo_list: @list, action: 'fin', content: item.content, logable: item)
				else
					log = ActionLog.create(user: @user, todo_list: @list, action: 'res', content: item.content, logable: item)
				end
			end			
			ActionCable.server.broadcast "list_#{@short_cut}",action: 'update_list_item', data: {
				id: item.id,
				content: item.content,
				finished: item.finished,
				is_delete: item.is_delete,
				log: {
					user: log.user,
					action: log.action,
					content: log.content,
					created_at: log.created_at.strftime("%Y-%m-%d %H:%M:%S")
				}
			}
			
			@res[:data][:item] = {
				id: item.id,
				content: item.content,
				finished: item.finished,
				is_delete: item.is_delete
			}
		else
			@res[:error] = 1
			@res[:msg]	 = 'list-item updating failed'
		end
		send_res
	end

	private
	def set_list
		@short_cut = params[:short_cut]
		@list = @user.lists.where(short_cut: params[:short_cut] ).first 
	end
end
