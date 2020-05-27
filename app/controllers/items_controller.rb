class ItemsController < ApplicationController

  require "payjp"

  def index

    # Itemから未購入商品だけを取り出して配列sellingに入れる
    selling = Item.all.select { |s| s.buyer_id == nil }
    
    # 新着商品の最新の３つを表示
    @newestItems = selling.last(3)
    # item_imgテーブルから上記と適した画像を取得
    @item_img = ItemImg.all

    # ピックアップ商品を3つ表示（3つの未購入かつ最新商品以外）
    last3deleted = selling[0..((selling.length)-4)]
    # リロードすると違う商品が表示されるよう、配列をシャッフル
    random = last3deleted.shuffle
    @pickupItems = random.take(3)
  end

  def new
  end

  def edit
  end

  def create
  end 

  def destroy
  end

  def show
    @item = Item.find(params[:id])
  end

  def update
  end

  def confirm
    # 購入する商品を引っ張ってきます。
    @item = Item.find(params[:id])
    # 商品ごとに複数枚写真を登録できるので、一応全部持ってきておきます。
    @images = @item.images.all

    # まずはログインしているか確認
    if user_signed_in?
      @user = current_user
      # クレジットカードが登録されているか確認
      if @user.credit_card.present?
        # 前前前回credentials.yml.encに記載したAPI秘密鍵を呼び出します。
        Payjp.api_key = Rails.application.credentials.dig(:payjp, :PAYJP_SECRET_KEY)
        # ログインユーザーのクレジットカード情報を引っ張ってきます。
        @card = CreditCard.find_by(user_id: current_user.id)
        # (以下は以前のcredit_cardsコントローラーのshowアクションとほぼ一緒です)
        # ログインユーザーのクレジットカード情報からPay.jpに登録されているカスタマー情報を引き出す
        customer = Payjp::Customer.retrieve(@card.customer_id)
        # カスタマー情報からカードの情報を引き出す
        @customer_card = customer.cards.retrieve(@card.card_id)

        ##カードのアイコン表示のための定義づけ
        @card_brand = @customer_card.brand
        case @card_brand
        when "Visa"
          # 例えば、Pay.jpからとってきたカード情報の、ブランドが"Visa"だった場合は返り値として
          # (画像として登録されている)Visa.pngを返す
          @card_src = "visa.gif"
        when "JCB"
          @card_src = "jcb.gif"
        when "MasterCard"
          @card_src = "master.png"
        when "American Express"
          @card_src = "amex.gif"
        when "Diners Club"
          @card_src = "diners.gif"
        when "Discover"
          @card_src = "discover.gif"
        end
        # viewの記述を簡略化
        ## 有効期限'月'を定義
        @exp_month = @customer_card.exp_month.to_s
        ## 有効期限'年'を定義
        @exp_year = @customer_card.exp_year.to_s.slice(2,3)
      else
      end
    else
      # ログインしていなければ、商品の購入ができずに、ログイン画面に移動します。
      redirect_to user_session_path, alert: "ログインしてください"
    end
  end

  def pay
    @item = Item.find(params[:id])
    @images = @product.images.all

    # 購入テーブル登録ずみ商品は２重で購入されないようにする
    # (２重で決済されることを防ぐ)
    if @item.purchase.present?
      redirect_to item_path(@item.id), alert: "売り切れています。"
    else
      # 同時に2人が同時に購入し、二重で購入処理がされることを防ぐための記述
      @product.with_lock do
        if current_user.credit_card.present?
            # ログインユーザーがクレジットカード登録済みの場合の処理
            # ログインユーザーのクレジットカード情報を引っ張ってきます。
          @card = CreditCard.find_by(user_id: current_user.id)
            # 前前前回credentials.yml.encに記載したAPI秘密鍵を呼び出します。
          Payjp.api_key = Rails.application.credentials.dig(:payjp, :PAYJP_SECRET_KEY)
            #登録したカードでの、クレジットカード決済処理
          charge = Payjp::Charge.create(
            # 商品(product)の値段を引っ張ってきて決済金額(amount)に入れる
          amount: @item.price,
          customer: Payjp::Customer.retrieve(@card.customer_id),
          currency: 'jpy'
          )
        else
          redirect_to item_path(@item.id), alert: "クレジットカードを登録してください"
        end
      #購入テーブルに登録処理(今回の実装では言及しませんが一応、、、)
      @purchase = Item.create(user_id: current_user.id)
      end
    end
  end
  
end
