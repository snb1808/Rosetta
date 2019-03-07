class ChatSerializer < ActiveModel::Serializer
  attributes :id, :recipient
  # has_many :userchats
  # has_many :users, through: :userchats

  def recipient
    two_users = self.object.users.pluck(:id)
    two_users.reject{|i| i == current_user.id}
  end
end
