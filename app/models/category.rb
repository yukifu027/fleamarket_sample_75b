class Category < ApplicationRecord
  has_many :items
  has_ancestry
  
  class Category < ActiveHash::Base
    self.data = [
        {category: 1, name: 'レディース'}, {category: 2, name: 'メンズ'}, {category: 3, name: 'ベビー・キッズ'},
        {category: 4, name: 'インテリア・住まい・小物'}, {category: 5, name: '本・音楽・ゲーム'}, {category: 6, name: 'おもちゃ・ホビー・グッズ'},
        {category: 7, name: 'コスメ・香水・美容'}, {category: 8, name: '家電・スマホ・カメラ'}, {category: 9, name: 'スポーツ・レジャー'},
        {category: 10, name: 'ハンドメイド'}, {category: 11, name: 'チケット'}, {category: 12, name: '自動車・オートバイ'},
        {category: 13, name: 'その他'}
    ]
  end
  
end
