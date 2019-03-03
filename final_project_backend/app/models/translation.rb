class Translation < ApplicationRecord
    belongs_to :user
    belongs_to :message
    has_one :chat, through: :message
end
