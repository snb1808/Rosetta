require 'google/cloud/translate'

class Api::V1::MessagesController < Api::V1::ApplicationController

    def index
        @messages = Message.select { |m| m.users.include?(current_user) }
        render json: @messages
    end

    def create
        @chat = Chat.find(params[:chat_id])
        @message = Message.new(original_content: params[:original_content], user_id: current_user.id, chat_id: params[:chat_id])
        @message.save!
        @users = @chat.other_users(current_user.id)
        gcloud = Google::Cloud.new 
        translate = gcloud.translate ENV['APIKEY']
        @users.each do |user| 
            translation = translate.translate params[:original_content], to: user.language.code
            Translation.create(user_id: user.id, content: translation.text, message_id: @message.id)
        end
        render json: @message
    end

    private

    def message_params
        params.require(:message).permit(:original_content, :user_id, :chat_id)
    end

end
