class Api::V1::TranslationsController < Api::V1::ApplicationController

    def index 
        @translations = Translation.all
        render json: @translations
    end

end
