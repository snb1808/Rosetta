class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :language_id, :profile_picture
end
