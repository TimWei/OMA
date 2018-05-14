class Api::V1::TodoListController < AuthController
	def index
		lists = @user.lists
		@res[:data][:lists] = []
		lists.each do |i|
			item = {
				name:  i.name,
				short_cut: i.short_cut
			}
			@res[:data][:lists] << item
		end
		send_res 
	end
	

	def create
		list = TodoList.new
		list.name = params[:list_name]
		list.owner_id = @user.id
		participant = Participant.new(user: @user, list: list)
		ActiveRecord::Base.transaction do
			begin
				list.save
				participant.save
				ActionLog.create(user: @user, todo_list: list, action: 'create', content: list.name, logable: list)
				@res[:data][:name] = list.name
				@res[:data][:short_cut] = list.short_cut
			rescue => e
				@res[:status] 	= 0
				@res[:error]  	= 1
				@res[:msg] 		= "list saving failed msg:#{e}" 
			end
		end
		send_res
	end

	def invite
		list = TodoList.where(short_cut: params[:short_cut] ).first 
		begin
			Participant.where(user: @user, list: list).first_or_create
			ActionLog.create(user: @user, todo_list: list, action: 'has invited', content: list.name, logable: list)
			@res[:data][:name] = list.name
			@res[:data][:short_cut] = list.short_cut
		rescue => e
			@res[:status] 	= 0
			@res[:error]  	= 1
			@res[:msg] 		= "list inviting failed msg:#{e}" 
		end
		send_res
	end
end
