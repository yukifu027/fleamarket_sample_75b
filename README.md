<h2 align="center">FURIMA</h2>

[![Image from Gyazo](https://i.gyazo.com/c9fc6af4b558d42bc23456426900347f.jpg)](https://gyazo.com/c9fc6af4b558d42bc23456426900347f)

# 詳細


# DB設計
# ユーザー系

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|password|string|null: false|
|email|string|null: false, unique: true|

### Association
- has_one :profile, dependent: :destroy
- has_one :sending_destination, dependent: :destroy
- has_one :credit_card, dependent: :destroy

## profilesテーブル

|Column|Type|Options|
|------|----|-------|
|first_name|string|null: false|
|family_name|string|null: false|
|first_name_kana|string|null: false|
|family_name_kana|string|null: false|
|birth_year|integer|null: false|
|birth_month|integer|null: false|
|birth_day|integer|null: false|
|user_id|references|null:false, foreign_key: true|

### Association
- belongs_to :user, optional: true

## sending_destinationsテーブル

|Column|Type|Options|
|------|----|-------|
|destination_first_name|string|null: false|
|destination_family_name|string|null: false|
|destination_first_name_kana|string|null: false|
|destination_family_name_kana|string|null: false|
|post_code|integer|null: false|
|prefecture_code|integer|null: false|
|city|string|null: false|
|house_number|string|null: false|
|building_name|string|--------|
|phone_number|string|unique: true|
|user_id|references|null: false, foreign_key :true|

### Association
- belongs_to :user, optional: true
- belongs_to_active_hash :prefecture

## credit_cardsテーブル(Pay.jp)

|Column|Type|Options|
|------|----|-------|
|customer_id|string|-------|
|card_id|string|-------|
|user_id|references|null: false, foreign_key :true|

### Association
- belongs_to :user, optional: true








# 商品系

## itemsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|introduction|text|null: false|
|price|integer|null: false|
|postage_payer_id|integer|null: false|
|prefecture_code|integer|null: false|
|preparation_day_id|integer|null: false|
|category_id|integer|null: false|
|item_condition_id|integer|null: false|
|seller_id|integer|------|
|buyer_id|integer|-------|
|brand|string|-------|

### Association
- has_many :item_imgs, dependent: :destroy
- belongs_to_active_hash :category
- belongs_to_active_hash :postage_payer
- belongs_to_active_hash :preparation_day
- belongs_to_active_hash :item_condition

## itemImgsテーブル

|Column|Type|Options|
|------|----|-------|
|item_id|references|null: false, foreign_key: true|
|url|string|null: false|

### Association
- belongs_to :item

## categoriesテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|ancestry|string|------|

### Association
- has_many :items
- has_ancestry

## item_conditionsテーブル(active_hash)

|Column|Type|Options|
|------|----|-------|
|item_condition|string|null: false|

### Association
- has_many :items


## postage_payersテーブル(active_hash)

|Column|Type|Options|
|------|----|-------|
|postage_payer|string|null: false|

### Association
- has_many :items

## preparation_daysテーブル(active_hash)

|Column|Type|Options|
|------|----|-------|
|preparation_day|string|null: false|

### Association
- has_many :items

## postage_typesテーブル(active_hash)

|Column|Type|Options|
|------|----|-------|
|postage_type|string|null: false|

### Association
- has_many :items
