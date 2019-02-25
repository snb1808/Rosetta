class Api::V1::LanguagesController < Api::V1::ApplicationController

    skip_before_action :authorized, only: [:index]

    def index
        @languages = Language.order('name')
        render json: @languages
    end

end
