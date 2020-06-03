class Item < ApplicationRecord
  # has_many :comments, dependent: :destroy
  # has_many :favorites
  has_many :item_imgs, dependent: :destroy
  # has_one :user_evaluation
  belongs_to :category
  # belongs_to_active_hash :size
  # belongs_to_active_hash :postage_payer
  # belongs_to_active_hash :preparation_day
  # belongs_to_active_hash :postage_type
  belongs_to :brand
  # belongs_to :seller, class_name: "User"
  # belongs_to :buyer, class_name: "User"

  # enum item_condition: [:new, :like_new, :good, :fair, :poor, :bad]
  # enum trading_status: [:selling, :sold]
  
  accepts_nested_attributes_for :item_imgs, allow_destroy: true


  # validates :item_img_id, :name, :introduction, :category_id, :item_condition, :postage_payer_id, :prefecture_code, :preparation_day_id, :price, presence: true
  
end
