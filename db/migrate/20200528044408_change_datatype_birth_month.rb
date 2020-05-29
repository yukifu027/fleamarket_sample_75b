class ChangeDatatypeBirthMonth < ActiveRecord::Migration[5.2]
  def change
    change_column :profiles, :birth_month, :integer, null:false
  end
end
