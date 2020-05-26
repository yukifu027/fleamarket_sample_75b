class ItemsController < ApplicationController

  def index
    @newestItems = Item.last(3)
    @item_img = ItemImg.all
    allItems = Item.all
    last3deleted = allItems[0..((allItems.length)-4)]
    random = last3deleted.shuffle
    @pickupItems = random.take(3)
  end

  def new
  end

  def edit
  end

  def create
    Item.create(item_params)
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

  private
  def item_params
    params.require(:item).permit(:name, :introduction, :price)
  end
  
end
