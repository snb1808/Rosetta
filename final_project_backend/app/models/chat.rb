class Chat < ApplicationRecord
    has_many :userchats
    has_many :users, through: :userchats
    has_many :languages, through: :users
    has_many :messages
    has_many :translations, through: :messages
    #chat.languages


    def other_users(user_id)
        @users = users.reject { |u| u.id == user_id }
        return @users
    end 

    def last_message()
        return self.messages.last
    end
end
