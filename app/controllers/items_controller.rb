class ItemsController < ApplicationController

  def index
    @items = Item.all 
    @items_img = ItemImg.url
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
  end

  def update
  end

  def confirm
  end

  
end
