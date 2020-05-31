class Profile < ApplicationRecord
  belongs_to :user, optional: true

  validates :first_name, :family_name, :first_name_kana, :family_name_kana, :birth_year, :birth_month, :birth_day, presence: true
  validates :first_name_kana, :family_name_kana, presence: true, format: { with: /\A[\p{katakana}\p{blank}ー－]+\z/}
  validates :first_name, :family_name, presence: true, format: { with: /\A[ぁ-んァ-ン一-龥]/}
end
