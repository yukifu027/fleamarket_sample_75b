class ItemsController < ApplicationController

  before_action :set_parents
  before_action :authenticate_user!,    only:[:edit]
  before_action :set_items,             except:[:index, :new, :create, :delete]
  require "payjp"

  def index

    @items = Item.includes(:item_imgs).order('created_at DESC')
    
    # Itemから未購入商品だけを取り出して配列sellingに入れる
    selling = Item.all.select { |s| s.buyer_id == nil }
    # Îtemから購入済の商品だけを取り出して配列soldに入れる
    sold = Item.all.select { |s| s.buyer_id != nil }
    
    # 新着商品の最新の３つを取得
    @newestItems = selling.last(3)
    # 購入済み商品の最新３つを取得
    @soldItems = sold.last(3)
    # item_imgテーブルから上記と適した画像を取得
    @item_img = ItemImg.all

    # ピックアップ商品を3つ表示（3つの未購入かつ最新商品以外）
    last3deleted = selling[0..((selling.length)-4)]
    # リロードすると違う商品が表示されるよう、配列をシャッフル
    random = last3deleted.shuffle
    @pickupItems = random.take(3)

    respond_to do |format|
      format.html
      format.json
    end

  end

  def new
    @item = Item.new
    @item.item_imgs.new
    @category_parent_array = Category.where(ancestry: nil).pluck(:name)
    @category_parent_array.unshift("---")

  end

  def create
    @item = Item.new(item_params)
    if @item.save
      @item.update(seller_id: current_user.id)
      redirect_to root_path
    else
      @item.item_imgs.new()
      render :new
    end
  end 

  def show
    @item_img = ItemImg.all
    @user = User.find_by_id @item.seller_id
    @category = Category.find_by_id @item.category_id
    @item_condition = ItemCondition.find_by_id @item.item_condition_id
    @postage_payer = PostagePayer.find_by_id @item.postage_payer_id
    @prefecture = Prefecture.find_by_id @item.prefecture_code
    @preparation_day = PreparationDay.find_by_id @item.preparation_day_id
  end

  def edit
  end

  def update
    if @item.update(item_params)
      redirect_to root_path 
    else
      render :edit
    end
  end

  def destroy
    if @item.destroy
      redirect_to delete_items_path
    else
      redirect_to item_path(item)
    end
  end

  def confirm
    # 商品ごとに複数枚写真を登録できるので、一応全部持ってきておきます。
    @image = @item.item_imgs[0].url.to_s
    @sending_destination = SendingDestination.find_by(user_id: current_user.id)
    @prefecture = Prefecture.find_by_id @sending_destination.prefecture_code

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
    # 購入テーブル登録ずみ商品は２重で購入されないようにする
    # (２重で決済されることを防ぐ)
    if @item.buyer_id.present?
      redirect_to item_path(@item.id), alert: "売り切れています"
    else
      # 同時に2人が同時に購入し、二重で購入処理がされることを防ぐための記述
      @item.with_lock do
        if current_user.credit_card.present?
            # ログインユーザーがクレジットカード登録済みの場合の処理
            # ログインユーザーのクレジットカード情報を引っ張ってきます。
          @card = CreditCard.find_by(user_id: current_user.id)
            # credentials.yml.encに記載したAPI秘密鍵を呼び出します。
          Payjp.api_key = Rails.application.credentials.dig(:payjp, :PAYJP_SECRET_KEY)
            #登録したカードでの、クレジットカード決済処理
          charge = Payjp::Charge.create(
            # 商品(product)の値段を引っ張ってきて決済金額(amount)に入れる
            amount: @item.price,
            customer: Payjp::Customer.retrieve(@card.customer_id),
            currency: 'jpy'
          )
          @item.update(buyer_id: current_user.id)
          redirect_to root_path, alert: "購入が完了しました"
        else
          redirect_to item_path(@item.id), alert: "マイページからクレジットカードを登録してください"
        end
      end
    end
  end

  def get_category_children 
    @category_children = Category.find(params[:category_id]).children
  end
  
  def get_category_grandchildren
    @category_grandchildren = Category.find("#{params[:child_id]}").children
  end


  private

  def set_items
    @item = Item.find(params[:id])
  end
  
  def item_params
    params.require(:item).permit(
      :name, 
      :price, 
      :brand,
      :prefecture_code, 
      :introduction, 
      :postage_payer_id, 
      :preparation_day_id,
      :category_id, 
      :item_condition_id, 
      item_imgs_attributes:  [:url, :_destroy, :id])
  end

end