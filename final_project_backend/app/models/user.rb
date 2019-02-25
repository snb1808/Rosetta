class User < ApplicationRecord
    has_secure_password
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :email, uniqueness: true 
    belongs_to :language
    has_many :userchats
    has_many :chats, through: :userchats
    has_many :messages

    def contact_list
        User.all - [self] - self.chats.map(&:users).flatten
    end
end
