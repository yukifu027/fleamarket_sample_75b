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

  //items/:i/editページへリンクした際のアクション
  if (window.location.href.match(/\/items\/\d+\/edit/)){
    //登録済み画像のプレビュー表示欄の要素を取得する
    // var prevContent = $('.label-content').prev();
    // labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
    // $('.label-content').css('width', labelWidth);
    //プレビューにidを追加
    $('.preview-box').each(function(index, box){
      $(box).attr('id', `preview-box__${index}`);
    })
    //削除ボタンにidを追加
    $('.preview-box__lower__btns--delete').each(function(index, box){
      $(box).attr('id', `delete_btn_${index}`);
    })
    // 編集ボタンにidを追加
    $('.preview-box__lower__btns--edit').each(function(index, box){
      $(box).attr('id', `edit_btn_${index}`);
    })

    var count = $('.preview-box').length;
    //プレビューが5あるときは、投稿ボックスを消しておく
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

  // プレビューの追加
  $(document).on('change', '.hidden-field', function() {
    // setLabel();
    //hidden-fieldのidの数値のみ取得
    var id = $(this).attr('id').replace(/[^0-9]/g, '');
    //labelボックスのidとforを更新
    $('.label-box').attr({id: `label-box--${id}`,for: `item_imgs_attributes_${id}_url`});
    //選択したfileのオブジェクトを取得
    var file = this.files[0];
    var reader = new FileReader();
    //readAsDataURLで指定したFileオブジェクトを読み込む
    reader.readAsDataURL(file);
    //読み込み時に発火するイベント
    reader.onload = function() {
      var image = this.result;
      //プレビューが元々なかった場合はhtmlを追加
      if ($(`#preview-box__${id}`).length == 0) {
        var count = $('.preview-box').length;
        var html = buildHTML(id);
        //ラベルの直前のプレビュー群にプレビューを追加
        var prevContent = $('.label-content').prev();
        $(prevContent).append(html);
      }
      //イメージを追加
      $(`#preview-box__${id} img`).attr('src', `${image}`);
      var count = $('.preview-box').length;
      //プレビューが5個あったらラベルを隠す 
      if (count == 5) { 
        $('.label-content').hide();
      }

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
  });

  // 画像の編集
  $(document).on('click', '.preview-box__lower__btns--edit', function() {
    var id = $(this).attr('id').replace(/[^0-9]/g, '');
    $(`#item_item_imgs_attributes_${id}_url`).click();
    $(`#item_item_imgs_attributes_${id}__destroy`).prop('checked',false);
  });

  // 画像を追加
  $(document).on('click', '.label-box', function() {
    let id = $('.preview-box').length;
    $(`#item_imgs_attributes_${id}_url`).click();
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

    if (id >= 1) {
      $(`#preview-box__${id}`).remove();
      $(`#item_item_imgs_attributes_${id}__destroy`).click();
    } 

    //新規登録時と編集時の場合分け==========================================================
    //新規投稿時
    //削除用チェックボックスの有無で判定
    if ($(`#item_imgs_attributes_${id}__destroy`).length == 0) {
      //フォームの中身を削除 
      $(`#item_imgs_attributes_${id}_url`).val("");
      var count = $('.preview-box').length;
      //5個めが消されたらラベルを表示
      if (count == 4) {
        $('.label-content').show();
      }
      setLabel(count);
      if(id < 5){
        $('.label-box').attr({id: `label-box--${id}`,for: `item_imgs_attributes_${id}_url`});
      }

    } else {

      //投稿編集時
      $(`#item_imgs_attributes_${id}__destroy`).prop('checked',true);
      //5個めが消されたらラベルを表示
      if (count == 4) {
        $('.label-content').show();
      }
    }
  });


  var r = 0
  var photoNum = $(`#preview-box__${id}`).length;
  while (r <= photoNum) {
    $(`#item_item_imgs_attributes_${r}__destroy`).prop('checked',false);
    photoNum++;
  }

});

