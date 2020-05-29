require 'rails_helper'

describe CreditCard do
  describe '#create' do
    it "card_id, customer_id, user_idが存在すれば登録できること" do
      card = CreditCard.new(card_id: "0000000", customer_id: "00000000", user_id: "1")
      card.valid?
      expect(card).to be_valid
    end

    it "card_idがない（カード情報が正しくない）場合は登録できないこと" do
      card = CreditCard.new(card_id: "", customer_id: "00000000", user_id: "1")
      card.valid?
      expect(card.errors[:card_id]).to include("can't be blank")
    end

    it "customer_idがない場合は登録できないこと" do
      card = CreditCard.new(card_id: "00000000", customer_id: "", user_id: "1")
      card.valid?
      expect(card.errors[:customer_id]).to include("can't be blank")
    end

    it "user_idがない（ログインしていない）場合は登録できないこと" do
      card = CreditCard.new(card_id: "00000000", customer_id: "00000000", user_id: "")
      card.valid?
      expect(card.errors[:user_id]).to include("can't be blank")
    end
  end
end