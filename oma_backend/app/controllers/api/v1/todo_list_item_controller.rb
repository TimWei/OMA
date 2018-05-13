class Api::V1::TodoListItemController < AuthController
	before_action :set_list
	def index
		@res[:data][:list] = {
			name: @list.name,
			short_cut: @list.short_cut,
			items: @list.items.map{|t| {id: t.id, content: t.content, finished: t.finished} }
		}
		send_res 
	end

	def create
		item = TodoListItem.new(todo_list: @list, content: params[:content])
		item.finished = false
		if item.save!

			ActionCable.server.broadcast "list_#{@short_cut}",action: 'append_list_item', data: {
				id: item.id,
				content: item.content,
				finished: item.finished,
			}

			@res[:data][:item] = {
				id: item.id,
				content: item.content,
				finished: item.finished,
			}
		else
			@res[:error] = 1
			@res[:msg]	 = 'list-item creating failed'
		end
		send_res
	end

	private
	def set_list
		@short_cut = params[:short_cut]
		@list = @user.lists.where(short_cut: params[:short_cut] ).first 
	end
end
