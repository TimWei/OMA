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

	def show
		list = TodoList.where(short_cut: params[:short_cut] ).first 
		@res[:data][:list] = {
			name: list.name,
			short_cut: list.short_cut,
			items: list.items.map{|t| { id: t.id, content: t.content, finished: t.finished} }
		}
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
		participant = Participant.new(user: @user, list: list)
		ActiveRecord::Base.transaction do
			begin
				list.save
				participant.save
				@res[:data][:name] = list.name
				@res[:data][:short_cut] = list.short_cut
			rescue => e
				@res[:status] 	= 0
				@res[:error]  	= 1
				@res[:msg] 		= "list inviting failed msg:#{e}" 
			end
		end
		send_res
	end
end
