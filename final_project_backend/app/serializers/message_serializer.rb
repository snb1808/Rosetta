class MessageSerializer < ActiveModel::Serializer
  attributes :id, :original_content, :user_id, :chat_id
end
