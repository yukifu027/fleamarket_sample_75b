class AddCustomerIdToCreditCards < ActiveRecord::Migration[5.2]
  def change
    add_column :credit_cards, :customer_id, :string
  end
end
