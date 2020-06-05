require 'rails_helper'

describe Item do
  describe '#new#edit' do
    
    it "nameがない場合は登録できないこと" do
      item = build(:item, name:aaa)
      item.valid?
      expect(item.errors[:name]).to include("can't be blank")
    end

    it "introductionがない場合は登録できないこと" do
      item = build(:item, introduction: nil)
      item.valid?
      expect(item.errors[:introduction]).to include("can't be blank")
    end

    it "prefecuture_codeがない場合は登録できないこと" do
      user = build(:item, prefecture_code: nil)
      user.valid?
      expect(item.errors[:prefecture_code]).to include("can't be blank")
    end

    it "priceがない場合は登録できないこと" do
      item = build(:item, price: nil)
      item.valid?
      expect(item.errors[:price]).to include("can't be blank")
    end

    it "postage_payer_idがない場合は登録できないこと" do
      item = build(:item, postage_payer_id: nil)
      item.valid?
      expect(item.errors[:postage_payer_id]).to include("can't be blank")
    end

    it "preparation_day_idがない場合は登録できないこと" do
      item = build(:item, preparation_day_id: nil)
      item.valid?
      expect(item.errors[:preparation_day_id]).to include("can't be blank")
    end

    it "category_idがない場合は登録できないこと" do
      item = build(:item, category_id: nil)
      item.valid?
      expect(item.errors[:category_id]).to include("can't be blank")
    end

    it "item_condition_idがない場合は登録できないこと" do
      item = build(:item, item_condition_id: nil)
      item.valid?
      expect(item.errors[:item_condition_id]).to include("can't be blank")
    end
  end
end
