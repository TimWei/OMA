class Api::V1::TodoListController < AuthController
	def index
		lists = @user.lists
		res = {}
		res[:lists] = []
		lists.each do |i|
			item = {
				name:  i.name,
				short_cut: i.short_cut
			}
			res[:lists] << item
		end
		send_res data: res
	end
end
