class AddColumnItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :postage_payer, :integer, null: false
    add_column :items, :preparation_day, :integer, null: false
    add_column :items, :category, :integer, null: false
    add_column :items, :item_condition, :integer, null: false
  end
end
