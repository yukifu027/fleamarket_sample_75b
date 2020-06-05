class Item < ApplicationRecord
  # has_many :comments, dependent: :destroy
  # has_many :favorites
  has_many :item_imgs, dependent: :destroy
  # has_one :user_evaluation
  # belongs_to :category
  # belongs_to_active_hash :size
  # belongs_to_active_hash :postage_payer
  # belongs_to_active_hash :preparation_day
  # belongs_to_active_hash :postage_type
  # belongs_to :brand
  # belongs_to :seller, class_name: "User"
  # belongs_to :buyer, class_name: "User"

  # enum item_condition: [:new, :like_new, :good, :fair, :poor, :bad]
  # enum trading_status: [:selling, :sold]
  
  accepts_nested_attributes_for :item_imgs, allow_destroy: true
  # belongs_to :category
  def self.search(search)
    if search
      Item.where('name LIKE(?)', "%#{search}%")
    else
      Item.all
    end
  end
end
