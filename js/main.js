$(window).on('load', function () {

    var showFontPreviewDialog = function() {
        $('#font-preview-dialog').css('top', window.scrollY).addClass('show');
        $('html').css('overflow', 'hidden');
    };

    var hideFontPreviewDialog = function() {
        $('#font-preview-dialog').removeClass('show');
        $('html').css('overflow', '');
    };

    let scroller = document.scrollingElement;

    // Force scrollbars to display
    scroller.style.setProperty('overflow', 'scroll');

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            hideFontPreviewDialog();
        }
    });

    // Wait for next from so scrollbars appear
    requestAnimationFrame(() => {

        // True width of the viewport, minus scrollbars
        scroller.style
            .setProperty(
                '--vw',
                scroller.clientWidth / 100
            );

        // Width of the scrollbar
        scroller.style
            .setProperty(
                '--scrollbar-width',
                window.innerWidth - scroller.clientWidth
            );

        // Reset overflow
        scroller.style
            .setProperty(
                'overflow',
                ''
            );
    });

    ////////

    var params = new URLSearchParams(location.search);
    var defaultText = params.has('t') ? params.get('t').substring(0, 100) : null;
    var defaultWeight = params.has('w') ? parseInt(params.get('w')) : 400;
    var defaultSize = params.has('s') ? parseInt(params.get('s')) : 30;
    var defaultItalic = params.has('i') ? parseInt(params.get('i')) : 0;
    var defaultPadding = params.has('p') ? parseInt(params.get('p')) : 0;

    $('#font-preview-dialog main').click(function () {
        $(this).attr('contenteditable', 'true');
        $(this).focus();
    });

    $('#font-preview-dialog .font-preview-box').each(function (_) {
        var $box = $(this);
        var $contentContainer = $('#preview-area');
        var $content = $('main', $contentContainer);

        $('.btn-close').on('click', function (e) {
            hideFontPreviewDialog();
            // $('html').css('padding-right', '');
        });

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
            $('#font-padding-preset button', $box).each(function () {
                var $this = $(this);
                $this.removeClass('btn-secondary').addClass('btn-light');
                if (value == $this.data('value')) {
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

        $('#font-family-selector button', $box).on('mouseover', function (e) {
            var $this = $(this);
            $this.parent().find('button').removeClass('btn-secondary').addClass('btn-light');
            $this.removeClass('btn-light').addClass('btn-secondary');
            $content.removeClass('font-hei').removeClass('font-sung').addClass($this.data('value'));
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


        // if (defaultText) {
        //   $content.text(defaultText);
        // }

        if (defaultSize) {
            $('#font-size-range', $box).val(defaultSize).trigger('input');
        }

        if (defaultItalic) {
            $('#font-italic-selector button[data-value=' + defaultItalic + ']', $box).trigger('mouseover');
        }

        if (defaultWeight) {
            $('#font-weight-range', $box).val(defaultWeight).trigger('input');
        }

        if (defaultPadding) {
            $('#font-padding-range', $box).val(defaultPadding).trigger('input');
        }
    });

    $('#preview-trigger, .preview-trigger').click(function () {
        // var s = $(this).data('font-preview');
        // if (s) {
        //   $('#previewModal div.lead').html(s.replaceAll('$', "<br/>"));
        // }
        showFontPreviewDialog();
        // $('html').css('padding-right', '16px');
        return false;
    });
});
