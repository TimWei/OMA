class ListChannel < ApplicationCable::Channel
  def subscribed
    @short_cut = params[:short_cut] 
    @user = User.find_by_token(params[:access_token])
    stop_all_streams
    stream_from "list_#{@short_cut}"
     @subscribed = true
  end

  def unsubscribed
    stop_all_streams
    @subscribed = false
  end

  def update_item body
    #broadcast_room json_data: {id: msg.id, content: CGI::escapeHTML(message), sender: @sender.name, at: msg.created_at.strftime("%H:%M"), color: msg.color}
  end

  def broadcast_room opt={}
    ActionCable.server.broadcast "list_#{@short_cut}",  opt[:json_data]
  end
end