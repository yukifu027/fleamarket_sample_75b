$(function(){
  function appendOption(category){
    var html = `<option value="${category.name}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }
  
  function appendChildrenBox(insertHTML){
    var childSelectHtml = '';
    childSelectHtml = `<div class='select-wrapper__added' id= 'children_wrapper'>
                        <div class='select-wrapper__box'>
                          <select class="select-wrapper__box--select" id="child_category" name="category_id">
                            <option value="--" data-category="--">---</option>
                            ${insertHTML}
                          <select>
                        </div>
                      </div>`;
    $('.category').append(childSelectHtml);
  }

  function appendGrandchildrenBox(insertHTML){
    var grandchildSelectHtml = '';
    grandchildSelectHtml = `<div class='select-wrapper__added' id= 'grandchildren_wrapper'>
                              <div class='select-wrapper__box'>
                                <select class="select-wrapper__box--select" id="grandchild_category" name="">
                                  <option value="--" data-category="--">---</option>
                                  ${insertHTML}
                                </select>
                              </div>
                            </div>`;
    $('.category').append(grandchildSelectHtml);
  }
  
  $('#parent_category').on('change', function(){
    var parentCategory = document.getElementById('parent_category').value; 
    if (parentCategory != "--"){ 
      $.ajax({
        url: 'get_category_children',
        type: 'GET',
        data: { parent_name: parentCategory },
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
    var childId = $('#child_category option:selected').data('category'); 
    if (childId != "--"){ 
      $.ajax({
        url: '/items/get_category_grandchildren',
        type: 'GET',
        data: { child_id: childId },
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