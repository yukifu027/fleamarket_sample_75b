$(function(){
  //プレビューのhtmlを定義
  function buildHTML(count) {
    var html = `<div class="preview-box" id="preview-box__${count}">
                  <div class="preview-box__upper">
                    <img src="" alt="preview" id="arrangePhotoSize">
                  </div>
                  <div class="preview-box__lower">
                    <div class="preview-box__lower__btns">
                      <div class="preview-box__lower__btns--edit">
                        <label class="edit-btn" id="edit_btn_${count}">編集</label>
                      </div>
                      <div class="preview-box__lower__btns--delete" id="delete_btn_${count}">
                        <span>削除</span>
                      </div>
                    </div>
                  </div>
                </div>`
    return html;
  }

  //編集ページへアクセスしたその時点で起こすアクション
  if (window.location.href.match(/\/items\/\d+\/edit/)){
    //登録済み画像のプレビュー表示欄の要素を取得する
    // var prevContent = $('.label-content').prev();
    // labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
    // $('.label-content').css('width', labelWidth);
    //プレビューにidを追加
    //各preview-box(画像のボックス)に0~4のidを与える
    $('.preview-box').each(function(index, box){
      $(box).attr('id', `preview-box__${index}`);
    })
    // 各編集ボタンに0~4のidを与える
    $('.preview-box__lower__btns--edit').each(function(index, box){
      $(box).attr('id', `edit_btn_${index}`);
    })
    // 各削除ボタンに0~4のidを与える
    $('.preview-box__lower__btns--delete').each(function(index, box){
      $(box).attr('id', `delete_btn_${index}`);
    })

    var count = $('.preview-box').length;
    //画像ボックスが既に5つある時は、カメラアイコンを消す
    if (count == 5) {
      $('.label-content').hide();
    } 
  }
  //=============================================================================

  // // ラベルのwidth操作
  // function setLabel() {
  //   //プレビューボックスのwidthを取得し、maxから引くことでラベルのwidthを決定
  //   var prevContent = $('.label-content').prev();
  //   labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
  //   $('.label-content').css('width', labelWidth);
  // }

  $(document).on('change', '.preview.box', function() {

    // 各preview-box(画像のボックス)にidを再び与える
    $('.preview-box').each(function(index, box){
      $(box).attr('id', `preview-box__${index}`);
    })
    // 各編集ボタンに0~4のidを再び与える
    $('.preview-box__lower__btns--edit').each(function(index, box){
      $(box).attr('id', `edit_btn_${index}`);
    })
    // 各削除ボタンに0~4のidを再び与える
    $('.preview-box__lower__btns--delete').each(function(index, box){
      $(box).attr('id', `delete_btn_${index}`);
    })

  });

  // プレビューの追加
  $(document).on('change', '.hidden-field', function() {

    //hidden-field（ファイルを選択ボタン）のid名の中の数値だけを取得
    var id = $(this).attr('id').replace(/[^0-9]/g, '');
    //labelボックスのidとforを更新
    // $('.label-box').attr({id: `label-box--${id}`,for: `item_imgs_attributes_${id}_url`});
    //選択した画像ファイルのオブジェクトを取得
    var file = this.files[0];
    var reader = new FileReader();
    //readAsDataURLで指定したFileオブジェクトを読み込む
    reader.readAsDataURL(file);
    //読み込み時に発火するイベント
    reader.onload = function() {
      var image = this.result;
      //新しく追加された画像を表示させる（htmlを追加)
      if ($(`#preview-box__${id}`).length == 0) {
        // var count = $('.preview-box').length;
        var html = buildHTML(id);
        // プレビュー群の一番右にプレビューを追加
        var prevContent = $('.label-content').prev();
        $(prevContent).append(html);

        $(`#item_item_imgs_attributes_${id}__destroy`).prop('checked',false);
        
        // もしプレビューした画像が５枚目の場合は、カメラアイコンを隠す
        if (id == 4) {
          $('.label-content').hide();
        } 
      }
      //画像ファイル自体をブラウザーに追加
      $(`#preview-box__${id} img`).attr('src', `${image}`);
      // var count = $('.preview-box').length;
      //プレビューが5個あったらラベルを隠す 
      // if (count == 5) { 
      //   $('.label-content').hide();
      // }


      //プレビュー削除したフィールドにdestroy用のチェックボックスがあった場合、チェックを外す=============
      // if ($(`#item_imgs_attributes_${id}__destroy`)){
      //   $(`#item_imgs_attributes_${id}__destroy`).prop('checked',false);
      // } 

      //ラベルのwidth操作
      // setLabel();
      // //ラベルのidとforの値を変更
      // if(count = 5){
      //   $('.label-box').attr({id: `label-box--${count}`,for: `item_imgs_attributes_${count}_url`});
      // }
    }
    // var count = $('.preview-box').length;

    $('.preview-box').each(function(index, box){
      $(box).attr('id', `preview-box__${index}`);
    })
    // 各編集ボタンに0~4のidを再び与える
    $('.preview-box__lower__btns--edit').each(function(index, box){
      $(box).attr('id', `edit_btn_${index}`);
    })
    // 各削除ボタンに0~4のidを再び与える
    $('.preview-box__lower__btns--delete').each(function(index, box){
      $(box).attr('id', `delete_btn_${index}`);
    })

  });

  // カメラアイコンを隠したり、また表示させたり

  // if ($('.preview-box').length == 5) {
  //   $('.label-content').hide();
  // } else {
  //   $('.label-content').show();
  // }



  // 編集ボタンをクリックして、画像を差し替える
  $(document).on('click', '.preview-box__lower__btns--edit', function() {
    var id = $(this).attr('id').replace(/[^0-9]/g, '');
    $(`#item_item_imgs_attributes_${id}_url`).click();
    $(`#item_item_imgs_attributes_${id}__destroy`).prop('checked',false);
  });


  // カメラアイコンををクリックして、画像を追加する
  $(document).on('click', '.label-content', function() {
    var id = ($('.preview-box').length);
    // もともとある画像ファイルデータのp数によって、ファイルを選択ボタンのid名が２種類あるため、どっちかを使ってclickさせる
    $(`#item_item_imgs_attributes_${id}_url`).click();
    $(`#item_imgs_attributes_${id}_url`).click();
    // $(`#ite_item_imgs_attributes_${id}__destroy`).prop('checked',false);
  });

    // if (num == 0) {
    //   var id = 1;
    //   $(`#item_imgs_attributes_${id}_url`).click();
    // } else if (num == 1) {
    //   var id = 2;
    //   $(`#item_imgs_attributes_${id}_url`).click();
    // } else if (num == 2) {
    //   var id = 3;
    //   $(`#item_imgs_attributes_${id}_url`).click();
    // } else {
    //   var id = 4;
    //   $(`#item_imgs_attributes_${id}_url`).click();
    // }

    // if (num == 1) {
    //   let id = (num + 1); 
    //   $(`#item_imgs_attributes_${id}_url`).click();
    // } else if (num == 2) {
    //   let id = (num + 2);
    //   $(`#item_imgs_attributes_${id}_url`).click();
    // } else if (num == 3) {
    //   let id = (num + 3);
    //   $(`#item_imgs_attributes_${id}_url`).click();
    // } else {
    //   let id = (num + 4);
    //   $(`#item_imgs_attributes_${id}_url`).click();
    // }

  // 画像の削除
  $(document).on('click', '.preview-box__lower__btns--delete', function() {
    var id = $(this).attr('id').replace(/[^0-9]/g, '');
    // var count = $('.preview-box').length;
    // idが1~4の画像ボックスが押されたなら、プレビューを消し、checkboxにもチェックを入れる
    var length = ($('.preview-box').length);
    if (id == 0 ) {
      $(`#item_item_imgs_attributes_${id}_url`).click();
    } else if (id == (length - 1)) {
      $(`#preview-box__${id}`).remove();
      $(`#item_item_imgs_attributes_${id}__destroy`).click();
      $(`#item_imgs_attributes_${id}__destroy`).prop('checked',true);
    } else {
      $(`#item_item_imgs_attributes_${id}_url`).click();
    }

    var num = ($('.preview-box').length);
    if (num == 4) {
      $('.label-content').show();
    }
    // $(`#item_imgs_attributes_${id}__destroy`).prop('checked',true);

    //新規登録時と編集時の場合分け==========================================================
    //新規投稿時
    //削除用チェックボックスの有無で判定
    // if ($(`#item_imgs_attributes_${id}__destroy`).length == 0) {
    //   //フォームの中身を削除 
    //   $(`#item_imgs_attributes_${id}_url`).val("");
    //   // var count = $('.preview-box').length;
    //   //5個めが消されたらラベルを表示
    //   // if (count == 4) {
    //   //   $('.label-content').show();
    //   // }
    //   // setLabel(count);
    //   if(id < 5){
    //     $('.label-box').attr({id: `label-box--${id}`,for: `item_imgs_attributes_${id}_url`});
    //   }

    // } else {

    //   //投稿編集時
    //   $(`#item_imgs_attributes_${id}__destroy`).prop('checked',true);
    //   //5個めが消されたらラベルを表示

    // }
  });

  // var r = 0
  // var photoNum = $('.preview-box').length;
  // while (r <= photoNum) {
  //   $(`#item_item_imgs_attributes_${r}__destroy`).prop('checked',false);
  //   photoNum++;
  // }

});

