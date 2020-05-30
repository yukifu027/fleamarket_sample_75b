class SendingDestination < ApplicationRecord
  belongs_to :user, optional: true

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :prefecture
  
  validates :destination_first_name,:destination_family_name,:destination_first_name_kana,:destination_family_name_kana,:post_code,:prefecture_code,:city,:house_number, presence: true
end
