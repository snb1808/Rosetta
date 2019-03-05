class Api::V1::UserchatsController < Api::V1::ApplicationController

    skip_before_action :authorized, only: [:index]

    def index
        @userchats = Userchat.all
        render json: @userchats
    end

    def show
        @userchat = Userchat.select { |uc| uc.chat_id == params[:chat_id] && uc.user_id == current_user.id }
        render json: @userchat
    end
    
    def update
        if params[:read] == false
            @userchats = Userchat.select { |uc| uc.chat_id == params[:chat_id] && uc.user_id != current_user.id }
            @userchats.each { |uc| uc.update(read: params[:read]) }
            render json: @userchats
        else
            @userchat = Userchat.select { |uc| uc.chat_id == params[:chat_id] && uc.user_id == current_user.id } 
            @userchat[0].update(read: params[:read])
            render json: @userchat
        end
    end

    private

    def userchat_params
        params.require[:userchat].permit[:user_id, :chat_id, :read]
    end

end
