class Items::SearchesController < ApplicationController
  def index
    @items = Item.search(params[:keyword]).includes(:item_imgs).order('created_at DESC').page(params[:page]).per(30)
  end
end
