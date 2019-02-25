class Api::V1::UsersController < Api::V1::ApplicationController

  skip_before_action :authorized, only: [:create]

  def index
      @users = User.all
      render json: @users
  end

  def profile
      render json: { user: UserSerializer.new(current_user) }, status: :accepted
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    @user = User.create!(user_params)
    if @user.valid?
      @token = issue_token(user_id: @user.id)
      puts @token
      render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
    else
      render json: { error: 'Failed to create user' }, status: :not_acceptable
    end
  end

  def contact_list
    @user = current_user
    # byebug
    render json: { users: @user.contact_list }, status: :accepted
  end
 
  private
 
  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :language_id, :profile_picture)
  end
end
