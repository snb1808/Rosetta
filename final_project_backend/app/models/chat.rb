class Chat < ApplicationRecord
    has_many :userchats
    has_many :users, through: :userchats
    has_many :languages, through: :users
    has_many :messages
    #chat.languages

    def other_user(user_id)
        @user = users.reject { |u| u.id == user_id }
        return @user[0]
    end 
end
