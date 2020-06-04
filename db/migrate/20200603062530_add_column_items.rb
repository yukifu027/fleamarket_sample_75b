class AddColumnItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :postage_payer_id, :integer, null: false
    add_column :items, :preparation_day_id, :integer, null: false
    add_column :items, :category_id, :integer, null: false
    add_column :items, :item_condition_id, :integer, null: false
  end
end
