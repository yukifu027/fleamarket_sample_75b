FactoryBot.define do

  factory :sending_destination do
    # user_id               {1}
    destination_family_name      {"佐藤"}
    destination_first_name       {"太郎"}
    destination_family_name_kana {"サトウ"}
    destination_first_name_kana  {"タロウ"}
    destination_code             {"123-4567"}
    prefecture_code              {1}
    city                         {"新宿区"}
    house_number                 {"1-1-1"}
    building_name                {"テックキャンプ101"}
    phone_number                 {"09012345678"}
  end

end