class UsersController < ApplicationController

  def new
    @user = User.new
    @user.build_profile
    @user.build_sending_destination
  end

  def create
  end

  def edit
  end

  def update
  end

  def show
  end

  def login
  end

  def logout
  end

end
