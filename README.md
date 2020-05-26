# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# ユーザー系

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|password|string|null: false|
|email|string|null: false, unique: true|

### Association
- has_many :comments, dependent: :destroy
- has_many :favorites, dependent: :destroy
- has_many :todo_lists
- has_many :user_evaluations
- has_many :seller_items, foreign_key: "seller_id", class_name: "items"
- has_many :buyer_items, foreign_key: "buyer_id", class_name: "items"
- has_one :point
- has_one :profile, dependent: :destroy
- has_one :sns_authentication, dependent: :destroy
- has_one :sending_destination, dependent: :destroy
- has_one :credit_card, dependent: :destroy

## profilesテーブル

|Column|Type|Options|
|------|----|-------|
|first_name|string|null: false|
|family_name|string|null: false|
|first_name_kana|string|null: false|
|family_name_kana|string|null: false|
|birth_year|date|null: false|
|birth_month|date|null: false|
|birth_day|date|null: false|
|introduction|text|-------|
|avatar|text|-------|
|user_id|references|null:false, foreign_key: true|

### Association
- belongs_to :user

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
- belongs_to :user
- Gem: jp_prefectureを使用して都道府県コードを取得

## credit_cardsテーブル(Pay.jp)

|Column|Type|Options|
|------|----|-------|
|card_number|integer|null: false, unique: true|
|expiration_year|integer|null: false|
|expiration_month|integer|null: false|
|security_code|integer|null: false|
|user_id|references|null: false, foreign_key :true|

### Association
- belongs_to :user

## user_evaluationsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|item_id|references|null: false, foreign_key: true|
|evaluation_id|references|null: false, foreign_key: true|
|review|text|null: false|

### Association
- belongs_to :item
- belongs_to :user
- belongs_to_active_hash :evaluation

## evaluationsテーブル(active_hash)

|Column|Type|Options|
|------|----|-------|
|evaluation|string|null: false|

### Association
- has_many :user_evaluations

## sns_authenticationsテーブル

|Column|Type|Options|
|------|----|-------|
|provider|string|null: false|
|uid|string|null: false, unique: true|
|token|text|-------|
|user_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user

## todo_listsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|list|text|null: false|

### Association
- belongs_to :user

## pointsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|point|integer|-------|

### Association
- belongs_to :user




# 商品系

## itemsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|introduction|text|null: false|
|price|integer|null: false|
|brand_id|references|foreign_key:true|
|postage_payer_id|references|null: false, foreign_key:true|
|prefecture_code|integer|null: false|
|size_id|references|null: false, foreign_key:true|
|preparation_day_id|references|null: false, foreign_key:true|
|item_img_id|references|null: false, foreign_key:true|
|category_id|references|null: false, foreign_key:true|
|trading_status|enum|null: false|
|item_condition|enum|null: false|
|seller_id|references|null: false, foreign_key:true|
|buyer_id|references|foreign_key:true|
|deal_closed_date|timestamp|-------|

### Association
- has_many :comments, dependent: :destroy
- has_many :favorites
- has_many :item_imgs, dependent: :destroy
- has_one :user_evaluation
- belongs_to :category
- belongs_to_active_hash :size
- belongs_to_active_hash :postage_payer
- belongs_to_active_hash :preparation_day
- belongs_to_active_hash :postage_type
- belongs_to :brand
- belongs_to :seller, class_name: "User"
- belongs_to :buyer, class_name: "User"
- Gem: jp_prefectureを使用して都道府県コードを取得

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
|ancestry|string|null: false|

### Association
- has_many :items

## sizesテーブル(active_hash)

|Column|Type|Options|
|------|----|-------|
|size|string|null: false|

### Association
- has_many :items

## brandsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|-------|

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




# 中間テーブル

## favoritesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|item_id|references|null: false, foreign_key: true|

### Association
- belongs_to :item
- belongs_to :user


## commentsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|item_id|references|null: false, foreign_key: true|
|comment|text|null: false|
|created_at|timestamp|null: false|

### Association
- belongs_to :item
- belongs_to :user