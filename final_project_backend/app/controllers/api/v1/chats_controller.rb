class Api::V1::ChatsController < Api::V1::ApplicationController

    skip_before_action :authorized, only: [:index]

    def index 
        @chats = Chat.select { |c| c.users.include?(current_user) }
        render json: @chats
    end

    def create
        @chat = Chat.new(chat_params)
        @chat.save!
        render json: @chat
    end

    def show 
        @chat = Chat.find(params[:id])
        render json: @chat
    end

    private

    def chat_params
        params.require(:chat).permit(:id)
    end

end
