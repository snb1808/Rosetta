class Message < ApplicationRecord
    belongs_to :user
    belongs_to :chat
    has_many :users, through: :chat
    has_many :languages, through: :users
end
