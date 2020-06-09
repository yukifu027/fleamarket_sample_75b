// 現状リンク先がないのと子要素を追加するときに親要素も重複して追加されてしまうので下記にて応急措置対応
$(function() {
  function buildParentHTML(parent){
    var html =`<a class="li parent_category" id="${parent.id}" 
                href="/category/${parent.id}">${parent.name}</a>`;
    $(".parents_list").append(html);
  }
  $("#TPcategoryBtn").on("mouseenter", function() {
    $.ajax({
      type: 'GET',
      url: '/',
      dataType: 'json'
    })
      .done(function(parents) {
        $('.parent_category').remove();
        parents.forEach(function (parent) {
          buildParentHTML(parent);
        })
      });
  });

  $(".TP-header__navi__left").on("mouseleave", function () {
    $(".parent_category").remove();
  });

  function buildChildHTML(child){
    var html =`<a class="li child_category" id="${child.id}" 
                href="/category/${child.id}">${child.name}</a>`;
    return html;
  }
  $(document).on("mouseenter",".parent_category", function() {
    var id = this.id;
    $(".child_category").remove();
    $(".grand_child_category").remove();
    $.ajax({
      type: 'GET',
      url: '/',
      data: {parent_id: id},
      dataType: 'json'
    }).done(function(children) {
      children.forEach(function (child) {
        // こちらで親要素の追加を無理やり防いでいる状況
        if (child.id != 1 && child.id != 200 && child.id != 346 && child.id != 481 && child.id != 625 && child.id != 685 && child.id != 798 && child.id != 898 && child.id != 984 && child.id != 1093 && child.id != 1147 && child.id != 1207 && child.id != 1270){
          var html = buildChildHTML(child);
          $(".children_list").append(html);
        }
      })
    });
  });
  $(".TP-header__navi__left").on("mouseleave", function () {
    $(".child_category").remove();
  });

  function buildGrandChildHTML(child){
    var html =`<a class="li grand_child_category" id="${child.id}" 
                href="/category/${child.id}">${child.name}</a>`;
    return html;
  }
  $(document).on("mouseover",".child_category", function() {
    var id = this.id;
    $(".grand_child_category").remove();
    $.ajax({
      type: 'GET',
      url: '/',
      data: {parent_id: id},
      dataType: 'json'
    }).done(function(children) {
      children.forEach(function (child) {
        if (child.id != 1 && child.id != 200 && child.id != 346 && child.id != 481 && child.id != 625 && child.id != 685 && child.id != 798 && child.id != 898 && child.id != 984 && child.id != 1093 && child.id != 1147 && child.id != 1207 && child.id != 1270){
          var html = buildGrandChildHTML(child);
          $(".grand_children_list").append(html);
        }
      })
    });
  });
  $(".TP-header__navi__left").on("mouseleave", function () {
    $(".grand_child_category").remove();
  });
}); 

