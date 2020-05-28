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
    @item = Item.new(item_params)
    if @item.save
      redirect_to root_path
    else
      render :new
    end
  end 

  private

  def item_params
    params.require(:item).permit(:name, :price, item_imgs_attributes: [:url])
  end


  def destroy
    @item.destroy
    redirect_to root_path
  end

  def show
  end

  def update
  end

  def confirm
  end

  before_action :set_product, except: [:index, :new, :create]

  def update
    if @item.update(item_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def item_params
    params.require(:item).permit(:name, :price, item_imgs_attributes:  [:url, :_destroy, :id])
  end

  def set_product
    @product = Product.find(params[:id])
  end 

end
