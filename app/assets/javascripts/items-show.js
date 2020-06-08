$(function() {
  $('.photo-inner__list--pics').on('click', function(e){
    e.preventDefault()
    var i = $(this).attr('src');
    $('.photo-inner__main').attr('src', i);
  })
});
