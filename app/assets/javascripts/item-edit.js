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

    $('.category').hide();

    var count = $('.preview-box').length;
    //画像ボックスが既に5つある時は、カメラアイコンを消す
    if (count == 5) {
      $('.label-content').hide();
    } 
  }

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
    }
     // 各編画像ボックスに0~4のidを再び与える
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

  // 画像の削除
  $(document).on('click', '.preview-box__lower__btns--delete', function() {
    var id = $(this).attr('id').replace(/[^0-9]/g, '');
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

  });

});

