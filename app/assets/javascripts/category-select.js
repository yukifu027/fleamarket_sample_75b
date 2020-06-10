$(function(){
  function appendOption(category){
    var html = `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }

  function appendChildrenBox(insertHTML){
    var childSelectHtml = `<div class='category__select__add' id= 'children_wrapper'>
                            <select class="items__delivery__select" id="child_category" name="item[category_id]">
                              <option value="--" data-category="--">--</option>
                              ${insertHTML}
                            <select>
                          </div>`;
    $('.category__select').append(childSelectHtml);
  }

  function appendGrandchildrenBox(insertHTML){
    var grandchildSelectHtml = `<div class='category__select__add' id= 'grandchildren_wrapper'>
                                  <select class="items__delivery__select" id="grandchild_category" name="item[category_id]">
                                    <option value="--" data-category="--">--</option>
                                    ${insertHTML}
                                  </select>
                                </div>`;
    $('.category__select').append(grandchildSelectHtml);
  }

  $('#parent_category').on('change', function(){
    var parent_category_id = document.getElementById
    ('parent_category').value;
    if (parent_category_id != "--"){
      $.ajax({
        url: '/items/get_category_children',
        type: 'GET',
        data: { parent_id: parent_category_id },
        dataType: 'json'
      })
      .done(function(children){
        $('#children_wrapper').remove();
        $('#grandchildren_wrapper').remove();
        var insertHTML = '';
        children.forEach(function(child){
          insertHTML += appendOption(child);
        });
        appendChildrenBox(insertHTML);
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#children_wrapper').remove();
      $('#grandchildren_wrapper').remove();
    }
  });

  $('.category').on('change', '#child_category', function(){
    var child_category_id = $('#child_category option:selected').data('category');
    if (child_category_id != "--"){
      $.ajax({
        url: '/items/get_category_grandchildren',
        type: 'GET',
        data: { child_id: child_category_id },
        dataType: 'json'
      })
      .done(function(grandchildren){
        if (grandchildren.length != 0) {
          $('#grandchildren_wrapper').remove();
          var insertHTML = '';
          grandchildren.forEach(function(grandchild){
            insertHTML += appendOption(grandchild);
          });
          appendGrandchildrenBox(insertHTML);
        }
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#grandchildren_wrapper').remove();
    }
  });
});