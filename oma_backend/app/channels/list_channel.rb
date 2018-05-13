class ListChannel < ApplicationCable::Channel
  def subscribed
    @short_cut = params[:short_cut] 
    @user = User.find_by_token(params[:access_token])
    @list = @user.lists.find_by_short_cut(@short_cut)
    stop_all_streams
    stream_from "list_#{@short_cut}"
    @subscribed = true
  end

  def unsubscribed
    stop_all_streams
    @subscribed = false
  end
end