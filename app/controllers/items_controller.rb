class ItemsController < ApplicationController

  def index
    @items = Item.includes(:item_imgs).order('created_at DESC')
  end

  def new
    @item = Item.new
    @item.item_imgs.new
  end

  def edit
  end

  def create
    @item = Item.new(product_params)
    if @item.save
      redirect_to root_path
    else
      render :new
    end
  end 

  private

  def item_params
    params.require(:item).permit(:name, :price, images_attributes: [:src])
  end

  def destroy
  end

  def show
  end

  def update
  end

  def confirm
  end

  
end
