class RemoveCardNumberFromCreditCards < ActiveRecord::Migration[5.2]
  def change
    remove_column :credit_cards, :card_number, :integer
  end
end
