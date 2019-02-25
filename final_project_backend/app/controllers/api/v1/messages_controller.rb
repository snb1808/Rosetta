require 'google/cloud/translate'

class Api::V1::MessagesController < Api::V1::ApplicationController

    def index
        @messages = Message.select { |m| m.users.include?(current_user) }
        render json: @messages
    end

    def create
        @chat = Chat.find(params[:chat_id])
        @user = @chat.other_user(params[:user_id])
        gcloud = Google::Cloud.new 
        translate = gcloud.translate ENV['APIKEY']
        translation = translate.translate params[:original_content], to: @user.language.code
        @message = Message.new(original_content: params[:original_content], user_id: params[:user_id], chat_id: params[:chat_id], translated_content: translation.text)
        @message.save!
        render json: @message
    end

    private

    def message_params
        params.require(:message).permit(:original_content, :user_id, :chat_id)
    end

end
