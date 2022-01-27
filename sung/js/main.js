$(window).on('load', function () {

  $('.font-preview-box').each(function (_) {
    var $box = $(this);
    var $contentContainer = $('#preview-area');
    var $content = $('div', $contentContainer);

    $('#font-size-range', $box).on('input', function (e) {
      $content.css('font-size', $(this).val() + "px");
      $(this).parent().parent().find('.cr-value')[0].innerText = $(this).val();
    });

    $('#font-weight-range', $box).on('input', function (e) {
      var weight = $(this).val();
      $content.css('font-weight', weight);
      $(this).parent().parent().find('.cr-value')[0].innerText = weight;
      $('#font-instances button', $box).each(function () {
        var $this = $(this);
        $this.removeClass('btn-secondary').addClass('btn-light');
        if ($this.data('weight') == weight) {
          $this.removeClass('btn-light').addClass('btn-secondary');
        }
      });
    }).on('change', function (e) {
      $(this).parent().parent().find('.cr-value')[0].innerText = $(this).val();
    });

    $('#font-padding-range', $box).on('input', function (e) {
      var value = $(this).val();
      $(this).parent().parent().find('.cr-value')[0].innerText = value;
      $content.css('font-variation-settings', '"PADG" ' + value);
      $('#font-padding button', $box).each(function () {
        var $this = $(this);
        $this.removeClass('btn-secondary').addClass('btn-light');
        if ($this.data('value') == value) {
          $this.removeClass('btn-light').addClass('btn-secondary');
        }
      });
    });

    $('#font-instances button', $box).on('mouseover', function (e) {
      $('#font-instances button', $box).removeClass('btn-secondary').addClass('btn-light');
      $(this).removeClass('btn-light').addClass('btn-secondary');
      $content.css('font-weight', $(this).data('weight'));
      $('#font-weight-range', $box).val($(this).data('weight')).trigger('change');
    });


    $('#font-padding-preset button', $box).on('mouseover', function (e) {
      var $this = $(this);
      $this.parent().find('button').removeClass('btn-secondary').addClass('btn-light');
      $this.removeClass('btn-light').addClass('btn-secondary');
      $('#font-padding-range', $box).val($(this).data('value')).trigger('input');
      // $content.css('font-weight', $(this).data('weight'));
      // $('#font-weight-range', $box).val($(this).data('weight')).trigger('change');
    });

    $('#font-italic-selector button', $box).on('mouseover', function (e) {
      var $this = $(this);
      $this.parent().find('button').removeClass('btn-secondary').addClass('btn-light');
      $this.removeClass('btn-light').addClass('btn-secondary');
      if ($this.data('value') == 1) {
        $content.css('font-style', 'italic');
      } else {
        $content.css('font-style', 'normal');
      }
    });

    // $('.font-buttons button', $box).on('mouseover', function (e) {
    //   $('.font-buttons button', $box).removeClass('btn-secondary').addClass('btn-light');
    //   $(this).removeClass('btn-light').addClass('btn-secondary');
    //   $contentContainer.removeClass('std pro pro-italic').addClass($(this).data('font-family'));
    //   if ($(this).data('vf')) {
    //     $('#font-weight-range').show();
    //   } else {
    //     $('#font-weight-range').hide();
    //   }
    // });

    $content.on('paste', function (e) {
      e.preventDefault();
      var text = (e.originalEvent || e).clipboardData.getData('text/plain');
      document.execCommand("insertHTML", false, text);
    });
  });

  $('#preview-trigger, .preview-trigger').click(function () {
    var s = $(this).data('font-preview');
    if (s) {
      $('#previewModal div.lead').html(s.replaceAll('$', "<br/>"));
    }
    $('#previewModal').modal();
    return false;
  });
});
