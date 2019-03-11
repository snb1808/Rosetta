class User < ApplicationRecord
    has_secure_password
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :email, uniqueness: true 
    validates :email, presence: true
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :profile_picture, presence: true
    belongs_to :language
    has_many :userchats
    has_many :chats, through: :userchats
    has_many :messages
    has_many :translations


    def contact_list
        all_chats = self.chats.select {|chat| chat.users.length == 1}
        User.all - [self] - all_chats.map(&:users).flatten
    end
end
