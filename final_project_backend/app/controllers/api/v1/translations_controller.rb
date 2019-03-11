class Api::V1::TranslationsController < Api::V1::ApplicationController

    def index 
        @translations = Translation.includes(:message, :user).all
        # @messages = Message.all
        render json: @translations
    end

end
