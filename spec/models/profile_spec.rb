describe Profile do
  describe '#create' do
    it 'is invalid with incorrect first_name format' do
      user = build(:user, first_name: "TARO")
      profile.valid?
      expect(user.errors[:first_name]).to include("は不正な値です")
    end

    it 'is invalid with incorrect last_name format' do
      user = build(:user, last_name: "TANAKA")
      profile.valid?
      expect(user.errors[:family_name]).to include("は不正な値です")
    end

    it 'is invalid with incorrect first_name_kana format' do
      user = build(:user, first_name_kana: "たろう")
      profile.valid?
      expect(user.errors[:first_name_kana]).to include("は不正な値です")
    end

    it 'is invalid with incorrect last_name_kana format' do
      user = build(:user, last_name_kana: "たなか")
      profile.valid?
      expect(user.errors[:family_name_kana]).to include("は不正な値です")
    end

    it 'is invalid without birthday' do
      user = build(:user, birthday: "")
      profile.valid?
      expect(user.errors[:birthday]).to include("を入力してください")
    end
  end
end
