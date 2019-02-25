class Api::V1::ChatsController < Api::V1::ApplicationController

    skip_before_action :authorized, only: [:index]

    def index 
        @chats = Chat.select { |c| c.users.include?(current_user) }
        render json: @chats
    end

    def create
        @chat = Chat.new
        @chat.save!
        Userchat.create(user_id: params[:myId], chat_id: @chat.id)
        Userchat.create(user_id: params[:targetId], chat_id: @chat.id)
        render json: @chat
    end

    def show 
        @chat = Chat.find(params[:id])
        render json: @chat
    end

end
