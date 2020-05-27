class ItemsController < ApplicationController

  def index

    allItems = Item.all
    selling = []

    # 未購入商品を取り出して配列sellingに入れる
    allItems.each do |product|
      if product.users_id.present?
        #何もしない
      else  
        selling << product
      end
    end

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
  end
  
end
