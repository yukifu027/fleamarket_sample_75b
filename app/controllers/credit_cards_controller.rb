class CreditCardsController < ApplicationController

  require "payjp" 

  def new
    # @card = CreditCard.where(user_id: current_user.id)
    # redirect_to credit_card_path(current_user.id) if @card.exists?
  end

  def create
    # 前回credentials.yml.encに記載したAPI秘密鍵を呼び出します。
    Payjp.api_key = Rails.application.credentials.dig(:payjp, :PAYJP_SECRET_KEY)

    # 後ほどトークン作成処理を行いますが、そちらの完了の有無でフラッシュメッセージを表示させます。
    if params["payjp_token"].blank?
      redirect_to action: "new"
    else
    # 無事トークン作成された場合のアクション(こっちが本命のアクション)
    # まずは生成したトークンから、顧客情報と紐付け、PAY.JP管理サイトに登録
      customer = Payjp::Customer.create(
        email: current_user.email,
        card: params["payjp_token"],
        metadata: {user_id: current_user.id} #最悪なくてもOK！
      )
      # 今度はトークン化した情報を自アプリのCredit_cardsテーブルに登録！
      @card = CreditCard.new(user_id: current_user.id, customer_id: customer.id, card_id: customer.default_card)
      # 無事、トークン作成とともにcredit_cardsテーブルに登録された場合、createビューが表示されるように条件分岐
      @card.save
      redirect_to root_path
    end
  end


end