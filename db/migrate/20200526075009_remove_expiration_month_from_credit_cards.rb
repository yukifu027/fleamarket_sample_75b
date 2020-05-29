class RemoveExpirationMonthFromCreditCards < ActiveRecord::Migration[5.2]
  def change
    remove_column :credit_cards, :expiration_month, :integer
  end
end
