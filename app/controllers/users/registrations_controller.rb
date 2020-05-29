# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]
  # GET /resource/sign_up
  def new
    super
  end
  # 新規登録１ページ目
  def create
    # ここで入力したデータを変数に入れる
    @user = User.new(sign_up_params)
    unless @user.valid?
      flash.now[:alert] = @user.errors.full_messages
      render :new and return
    end
    # ここで変数に入れたデータをsessionメソッドを使って保留させる
    session["devise.regist_data"] = {user: @user.attributes}
    session["devise.regist_data"][:user]["password"] = params[:user][:password]
    # ここで次のprofileページと紐付けている
    @profile = @user.build_profile
    # ここで次のページを呼ぶ
    render :new_profile
  end

  def create_profile
    # ここで１ページ目で保留しているデータを呼び出し新たに２ページ目のprofileを変数に代入
    @user = User.new(session["devise.regist_data"]["user"])
    @profile = Profile.new(profile_params)
    unless @profile.valid?
      flash.now[:alert] = @profile.errors.full_messages
      render :new_profile and return
    end
    @user.build_profile(@profile.attributes)
    session["profile"] = @profile.attributes
    @sending_destination = @user.build_sending_destination
    render :new_sending_destination
  end

  def create_sending_destination
    @user = User.new(session["devise.regist_data"]["user"])
    @profile = Profile.new(session["profile"])
    @sending_destination = SendingDestination.new(sending_destination_params)
    unless @sending_destination.valid?
      flash.now[:alert] = @sending_destination.errors.full_messages
      render :new_sending_destination and return
    end
    @user.build_profile(@profile.attributes)
    @user.build_sending_destination(@sending_destination.attributes)
    # 最後のページなのでここでは保留せずsaveメソッドを使ってデータを保存する
    @user.save
    sign_in(:user, @user)
    redirect_to root_path
  end

  # POST /resource
  # def create
  #   super
  # end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  def profile_params
    params.require(:profile).permit(:first_name, :family_name, :first_name_kana, :family_name_kana, :birth_year, :birth_month, :birth_day)
  end

  def sending_destination_params
    params.require(:sending_destination).permit(:destination_first_name, :destination_family_name, :destination_first_name_kana, :destination_family_name_kana, :post_code, :prefecture_code, :city, :house_number, :building_name, :phone_number,)
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
