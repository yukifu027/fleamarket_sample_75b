$(function(){
  //DataTransferオブジェクトで、データを格納する箱を作る
  var dataBox = new DataTransfer();
  //querySelectorでfile_fieldを取得
  var file_field = document.querySelector('input[type=file]')
  //fileが選択された時に発火するイベント
  $('#img-file').change(function(){
    //選択したfileのオブジェクトをpropで取得
    var files = $('input[type="file"]').prop('files')[0];
    $.each(this.files, function(i, file){
      //FileReaderのreadAsDataURLで指定したFileオブジェクトを読み込む
      var fileReader = new FileReader();

      //DataTransferオブジェクトに対して、fileを追加
      dataBox.items.add(file)
      //DataTransferオブジェクトに入ったfile一覧をfile_fieldの中に代入
      file_field.files = dataBox.files

      var num = $('.item-image').length + 1 + i
      fileReader.readAsDataURL(file);
      //画像が10枚になったら超えたらドロップボックスを削除する
      if (num == 10){
        $('#image-box__container').css('display', 'none')   
      }
      //読み込みが完了すると、srcにfileのURLを格納
      fileReader.onloadend = function() {
        var src = fileReader.result
        var html= `<div class='item-image' data-image="${file.name}">
                    <div class=' item-image__content'>
                      <div class='item-image__content--icon'>
                        <img src=${src} width="100" height="100" >
                      </div>
                    </div>
                    <div class='item-image__operetion'>
                      <div class='item-image__operetion--delete'>削除</div>
                    </div>
                  </div>`
        //image_box__container要素の前にhtmlを差し込む
        $('#image-box__container').before(html);
      };
      //image-box__containerのクラスを変更し、CSSでドロップボックスの大きさを変えてやる。
      $('#image-box__container').attr('class', `item-num-${num}`)
    });
  });
  //削除ボタンをクリックすると発火するイベント
  $(document).on("click", '.item-image__operetion--delete', function(){
    //削除を押されたプレビュー要素を取得
    var target_image = $(this).parent().parent()
    //削除を押されたプレビューimageのfile名を取得
    var target_name = $(target_image).data('image')
    //プレビューがひとつだけの場合、file_fieldをクリア
    if(file_field.files.length==1){
      //inputタグに入ったファイルを削除
      $('input[type=file]').val(null)
      dataBox.clearData();
      console.log(dataBox)
    }else{
      //プレビューが複数の場合
      $.each(file_field.files, function(i,input){
        //削除を押された要素と一致した時、index番号に基づいてdataBoxに格納された要素を削除する
        if(input.name==target_name){
          dataBox.items.remove(i) 
        }
      })
      //DataTransferオブジェクトに入ったfile一覧をfile_fieldの中に再度代入
      file_field.files = dataBox.files
    }
    //プレビューを削除
    target_image.remove()
    //image-box__containerクラスをもつdivタグのクラスを削除のたびに変更
    var num = $('.item-image').length
    $('#image-box__container').show()
    $('#image-box__container').attr('class', `item-num-${num}`)
  })
});

$(function() {

  $('.photo-container__list--order').click(function(){
    $(this).css('display','none');
  });

});

// $(function(){
//   $('#photoDelete').click.(function() {
//     $('#photoContainer').remove();
//   });
// });










// $(function(){
//   let fileIndex = 1
//   const buildFileField = (num)=> {
//     const html = `<div class="js-file_group" data-index="${num}">
//                     <input class="js-file" type="file"
//                     name="item[item_imgs_attributes][${num}][image]"
//                     id="item_item_imgs_attributes_${num}_image">
//                     <span class="js-remove">削除</span>
//                   </div>`;
//     fileIndex += 1
//     return html;
//   }

//   const buildImg = (index, url)=> {
//     const html = `<img data-index="${index}" src="${url}" width="100px" height="100px">`;
//     return html;
//   }

//   $('.hidden-destroy').hide();

//   $('#image-box').on('change', '.js-file', function(e) {

//     const targetIndex = $(this).parent().data('index');
//     const file = e.target.files[0];


//     if(!file){
//       $(`.js-file_group[data-index=${targetIndex}]`).find(".js-remove").trigger("click");
//       return false;
//     }

//       var blobUrl = window.URL.createObjectURL(file);

//     if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
//       img.setAttribute('src', blobUrl);
//     } else {  
//       $('#previews').append(buildImg(targetIndex, blobUrl));
//     let limitFileField = $(".js-file_group:last").data("index");

//     if($(".js-file_group").length >= 10 ){
//       return false;
//     } else {
//       $('#image-box').append(buildFileField(fileIndex));

//     }
//     }
//   });

//   $('#image-box').on('click', '.js-remove', function() {
//     let limitFileField = $(".js-file_group:last").data("index");
//     const targetIndex = $(this).parent().data('index')
//     const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
//     if (hiddenCheck) hiddenCheck.prop('checked', true);
//     $(this).parent().remove();
//     $(`img[data-index="${targetIndex}"]`).remove();
//     if ((targetIndex == limitFileField ) || ($(".js-file_group").length >= 9)) ($('#image-box').append(buildFileField(fileIndex)));
//   });
// });