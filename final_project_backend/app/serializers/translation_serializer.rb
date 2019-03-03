class TranslationSerializer < ActiveModel::Serializer
  attributes :id, :message, :user, :content
end
