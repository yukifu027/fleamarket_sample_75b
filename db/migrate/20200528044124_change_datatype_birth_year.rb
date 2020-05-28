class ChangeDatatypeBirthYear < ActiveRecord::Migration[5.2]
  def change
    change_column :profiles, :birth_year, :integer, null:false
  end
end
