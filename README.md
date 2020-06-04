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

## usersテーブル ok
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|password|string|null: false|
|email|string|null: false, unique: true|

### Association ok
- has_one :profile, dependent: :destroy
- has_one :sending_destination, dependent: :destroy
- has_one :credit_card, dependent: :destroy

## profilesテーブル ok

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

### Association ok
- belongs_to :user, optional: true

## sending_destinationsテーブル ok 

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

### Association ok
- belongs_to :user, optional: true
- belongs_to_active_hash :prefecture

## credit_cardsテーブル(Pay.jp) ok 

|Column|Type|Options|
|------|----|-------|
|customer_id|string|-------|
|card_id|string|-------|
|user_id|references|null: false, foreign_key :true|

### Association ok
- belongs_to :user, optional: true








# 商品系

## itemsテーブル ok

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|introduction|text|null: false|
|price|integer|null: false|
<!-- |brand_id|references|foreign_key:true| -->
|postage_payer|integer|null: false|
|prefecture_code|integer|null: false|
<!-- |size_id|references|null: false, foreign_key:true| -->
|preparation_day|integer|null: false|
<!-- |item_img_id|references|null: false, foreign_key:true| -->
|category|integer|null: false|
<!-- |trading_status|enum|null: false| -->
|item_condition|integer|null: false|
|seller_id|integer|------|
|buyer_id|integer|-------|
<!-- |deal_closed_date|timestamp|-------| -->

### Association ok
- has_many :item_imgs, dependent: :destroy
- belongs_to_active_hash :category
- belongs_to_active_hash :postage_payer
- belongs_to_active_hash :preparation_day
- belongs_to_active_hash :item_condition

## itemImgsテーブル ok

|Column|Type|Options|
|------|----|-------|
|item_id|references|null: false, foreign_key: true|
|url|string|null: false|

### Association ok 
- belongs_to :item

## categoriesテーブル ok

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|ancestry|string|------|

### Association ok
- has_many :items
- has_ancestry

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