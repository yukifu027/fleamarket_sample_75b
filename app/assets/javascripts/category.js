$(function() {
  // 子カテゴリーを追加するための処理です。
  function buildParentHTML(parent){
    let html =`<a class="parent_category" id="${parent.id}" 
                href="/category/${parent.id}">${parent.name}</a>`;
    $(".parents_list").append(html);
  }
  
  $("#TPcategoryBtn").on("mouseover", function() {
    $.ajax({
      type: 'GET',
      url: '/',
      dataType: 'json'
    })
      .done(function(parents) {
        $(".parent_category").remove();
        parents.forEach(function (parent) {
          buildParentHTML(parent);
        })
        $(".TP-header__navi__left--links").on("mouseout", function () {
          $(".parent_category").remove();
        });
      });
  });
});