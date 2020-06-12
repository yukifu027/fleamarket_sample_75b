window.addEventListener('DOMContentLoaded', function(){

  //id名が"payment_card_submit-button"というボタンが押されたら取得
  let submit = document.getElementById("payment_card_submit-button");

  Payjp.setPublicKey('pk_test_6b475e7b2164c361b2105454'); //公開鍵の記述

    submit.addEventListener('click', function(e){ //ボタンが押されたらトークン作成開始。

    e.preventDefault(); //ボタンを1度無効化

    let card = { //入力されたカード情報を取得
        number: document.getElementById("payment_card_no").value,
        cvc: document.getElementById("cvc").value,
        exp_month: document.getElementById("exp_month").value,
        exp_year: document.getElementById("exp_year").value
    };

    console.log(card)

    Payjp.createToken(card, function(status, response) {  // トークンを生成
      if (status === 200) { //成功した場合
        //データを自サーバにpostしないようにremoveAttr("name")で削除
        $("#payment_card_no").removeAttr("name");
        $("#cvc").removeAttr("name");
        $("#exp_month").removeAttr("name");
        $("#exp_year").removeAttr("name"); 
        $("#charge-form").append(
          $('<input type="hidden" name="payjp_token">').val(response.id)
        ); //取得したトークンを送信できる状態にします
        $("#charge-form").get(0).submit();
        alert("登録が完了しました"); //正常処理完了確認用。
      } else {
        alert("カード情報が正しくありません。"); //エラー確認用
      }
    });
  });
});