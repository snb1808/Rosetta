class ChatSerializer < ActiveModel::Serializer
  attributes :id, :recipient

  def recipient
    two_users = self.object.users.pluck(:id)
    two_users.reject{|i| i == current_user.id}
    # have the current user on rails side already, then we can 
    # self # => serializer
    # self.object # => chat
  end
end
