class CreditCard < ApplicationRecord

  belongs_to :user, optional: true

  validates :card_id, presence: true
  validates :customer_id, presence: true
  validates :user_id, presence: true

end