$(function() {
  $('#position').keyup(function() {
    var query = $('#position').val() || "";
    query = query.trim();
    if (!query) {
      return; 
    }
    $('.form').addClass('loading');

    $.ajax({
      url: '/suggest',
      data: {position: query},
      success: function(data) {
        var els = _.map(data, function(name) {
          return '<li>' + name + '</li>';
        });
        $('.suggest-box').html(els.join('\n')).show();

        $('.suggest-box li').click(function(e) {
          $('#position').val($(e.currentTarget).text())
          $('.suggest-box').hide();
        });
      },
      complete: function() {
        $('.form').removeClass('loading');  
      }
    });
  });
});
