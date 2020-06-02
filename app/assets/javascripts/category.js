$(function() {
  // 子カテゴリーを追加するための処理です。
  function buildParentHTML(parent){
    let html =`<a class="child_category" id="${parent.id}" 
                href="/category/${parent.id}">${parent.name}</a>`;
    $("#TPcategoryBtn").append(html);
  }
  
  $("#TPcategoryBtn").on("mouseover", function() {
    $.ajax({
      type: 'GET',
      url: '/',//とりあえずここでは、newアクションに飛ばしてます
      // data: {parent_id: id},//どの親の要素かを送ります　params[:parent_id]で送られる
      dataType: 'json'
    })
      .done(function(parents) {
        console.log(parents)
        $('.child_category').remove();
        parents.forEach(function (parent) {//帰ってきた子カテゴリー（配列）
          buildParentHTML(parent);//HTMLにして
        })
      });
  });
});