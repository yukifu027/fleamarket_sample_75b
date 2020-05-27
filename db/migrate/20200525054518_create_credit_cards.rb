class CreateCreditCards < ActiveRecord::Migration[5.2]
  def change
    create_table :credit_cards do |t|
      t.integer :card_number, null: false, unique: true
      t.integer :expiration_year, null:false
      t.integer :expiration_month, null:false
      t.integer :security_code, null:false
      t.references :user, null: false, foreign_key: :true
      t.timestamps
    end
  end
end
