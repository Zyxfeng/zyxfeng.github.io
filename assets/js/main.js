$(document).ready(function () {
    $('a.blog-button').click(function () {
        if (location.hash && location.hash == '#blog') return;
        if ($('.panel-cover').hasClass('panel-cover--collapsed')) return;
        $('.main-post-list').removeClass('hidden');
        currentWidth = $('.panel-cover').width();
        if (currentWidth < 960) {
            $('.panel-cover').addClass('panel-cover--collapsed');
        } else {
            $('.panel-cover').css('max-width', currentWidth);
            $('.panel-cover').animate({'max-width': '700px', 'width': '30%'}, 400, swing='swing', function () {});
        }
    });
    if (window.location.hash && window.location.hash === '#blog') {
        $('.panel-cover').addClass('panel-cover--collapsed');
        $('.main-post-list').removeClass('hidden');
    }

    $('.btn-mobile-menu').on('click', function () {
        if ($('.navigation-wrapper').css('display') === 'block') {
            $('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationEnd animationend', function () {
                $('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
                $('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationEnd animationend');
            });
            $('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');
        } else {
            $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
        }
        $('.btn-mobile-menu__icon').toggleClass('hidden animated fadeIn');
        $('.btn-mobile-close__icon').toggleClass('hidden');
    });
})