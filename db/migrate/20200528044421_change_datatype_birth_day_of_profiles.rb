class ChangeDatatypeBirthDayOfProfiles < ActiveRecord::Migration[5.2]
  def change
    change_column :profiles, :birth_day, :integer, null:false
  end
end
