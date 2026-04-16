(function($) {
    "use strict";
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }

    //backToTop
    function backToTop() {
        $(window).scroll(function() {
            if ($(window).scrollTop() >= 200) {
                $('#to_top').fadeIn();
            } else {
                $('#to_top').fadeOut();
            }
        });

        $("#to_top").click(function() {
            $("html, body").animate({
                scrollTop: 0
            });
            return false;
        });
    }

    //resizeSite
    function resizeSite() {
        var heightVideo = $('#player_playing').height() - 64;
        $('.detail_right .scrollbar-inner').height(heightVideo);
    }

    //fixSticky
    /* function fixStickyIE() {
        var stickyElements = $('.sticky');
        if (stickyElements.length > 0) {
            Stickyfill.add(stickyElements);
        }
        $("<div id='box_menu_before'></div>").insertBefore(".section_top");
        $(window).scroll(function () {
            var top_start = $("#box_menu_before").position().top;
            if ($(window).scrollTop() >= top_start) {
                $('.section_top').addClass('fixed');
            } else if ($(window).scrollTop() <= top_start) {

                $('.section_top').removeClass('fixed');
            }
        });

    } */

    //onCLick
    function onCLick() {
        $('.search-btn').click(function() {
            if (!$(this).hasClass('is-clicked')) {
                $(this).addClass('is-clicked');
                $('.search-wrap').fadeIn();
                $('.search-wrap input').focus();
            } else {
                $(this).removeClass('is-clicked');
                $('.search-wrap').fadeOut();
            }
        });
        $(".all-menu-tablet").click(function() {
            $(this).toggleClass("close-menu-tablet");
        });
        $(".all-menu").click(function() {
            $(".main-nav").toggleClass("show-all-menu");
        });
        $('.dark_night').click(function() {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $('body').addClass('dark_mode');
            } else {
                $(this).removeClass('active');
                $('body').removeClass('dark_mode');
            }
        });
    }

    $(function() {
        backToTop();
        /* fixStickyIE(); */
        onCLick();
    });
    $(window).on('load resize', function() {
        resizeSite()
    });

    // Sticky Header Menu HomePage
    window.onscroll = function() {
        myFunction()
    };

    var header = document.getElementById("wrap-main-nav");
    var sticky = header.offsetTop;

    function myFunction() {

        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");

        } else {
            header.classList.remove("sticky");
        }
    }

    // View more content banner
    $(".btn-view-more").click(function() {
        $('.fade-in-bottom .des').toggleClass("active");
    });

    //Slide Tin tức video trang home
    var swiper = new Swiper(".box-slide-news .list-news", {
        slidesPerView: 3.75,
        spaceBetween: 30,
        // Navigation arrows
        navigation: {
            nextEl: '.box-slide-news .swiper-button-next',
            prevEl: '.box-slide-news .swiper-button-prev',
        },
        pagination: {
            el: ".box-slide-news .swiper-pagination",
            type: "progressbar",
        },
        breakpoints: {
            // when window width is >= 640px
            600: {
                slidesPerView: 1.5,
                spaceBetween: 30
            }
        }
    });

    //Slide Tin tức video trang home
    var swiper = new Swiper(".box-slide-binhchon .list-binhchon", {
        slidesPerView: 4,
        spaceBetween: 30,
        // Navigation arrows
        navigation: {
            nextEl: '.box-slide-binhchon .swiper-button-next',
            prevEl: '.box-slide-binhchon .swiper-button-prev',
        },
        pagination: {
            el: ".box-slide-binhchon .swiper-pagination",
            type: "progressbar",
        },
        breakpoints: {
            // when window width is >= 640px
            767: {
                slidesPerView: 1.5,
                spaceBetween: 20
            }
        }
    });

    //Slide Đề cử hạng muc trang detail

    if ($(window).width() > 767) {
        var swiper = new Swiper(".slide-decu-hm .list-binhchon", {
            slidesPerView: 3,
            spaceBetween: 30,
            // Navigation arrows
            navigation: {
                nextEl: '.slide-decu-hm .swiper-button-next',
                prevEl: '.slide-decu-hm .swiper-button-prev',
            },
            pagination: {
                el: ".slide-decu-hm .swiper-pagination",
                type: "progressbar",
            },
            breakpoints: {
                // when window width is >= 640px
                767: {
                    slidesPerView: 1.5,
                    spaceBetween: 30
                }
            }
        });
    }

    // Manafic Popup
    $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        mainClass: 'mfp-with-zoom',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        removalDelay: 300,
    });

    //Daterangepicker
    // $(function() {
    //     $('input[name="datetime"]').daterangepicker({
    //         singleDatePicker: true,
    //         showDropdowns: true,
    //         minYear: 1901,
    //         maxYear: parseInt(moment().format('YYYY'), 10)
    //     }, function(start, end, label) {
    //         var years = moment().diff(start, 'years');
    //         alert("You are " + years + " years old!");
    //     });
    // });


    // Gallery Product

    function grallerySlide() {
        var swiper = new Swiper("#grallery .gallery-thumbs", {
            spaceBetween: 0,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                600: {
                    slidesPerView: 3.3,
                }
            }
        });
        var swiper2 = new Swiper("#grallery .gallery-top", {
            spaceBetween: 10,
            autoplay: {
                delay: 6000,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
                swiper: swiper,
            },
        });

        var box_lightGallery = document.getElementById('lightgallery');
        if (typeof box_lightGallery != 'undefined' && box_lightGallery != null) {
            lightGallery(box_lightGallery, {
                selector: '.item-gt',
                thumbMargin: 20,
                thumbContHeight: 120,
                subHtmlSelectorRelative: true,
                thumbnail: true,
            });

            box_lightGallery.addEventListener(
                'onAfterOpen',
                function(e) {
                    $('.lg-sub-html').insertBefore('.lg-inner');
                    $('.lg-sub-html').wrap("<div class='lg-sub-html_wrapper'></div>");
                    // $(".lg-sub-html").perfectScrollbar();
                },
                false
            );
        }
        $('.swiper-slide .thumb_img').on('click', function() {
            var data_img = $(this).attr('data-img');
            if (data_img) {
                $("#lightgallery a[data-img='" + data_img + "']")[0].click();
            }
        });

        // IF Item Slide = 1 -> Hide Gallery Thumbs
        var count_itemt_slide = $(".gallery-top .swiper-slide").length;

        if (count_itemt_slide <= 1) {
            $(".gallery-thumbs .swiper-slide").remove();
            $(".gallery-top .swiper-button-prev").remove();
            $(".gallery-top .swiper-button-next").remove();
        }

    }

    $(function() {
        //grallerySlide();
    });

    //Remove Slide Hạng mục Game Bình Chọn

    /**SLIDE SUB VIDEO*/
    var wrap_slide_sub_video = new Swiper('.wrap-pic-slide.swiper-container', {
        slidesPerView: 1.4,
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        navigation: {
            nextEl: '.detail-product__left .swiper-button-box-next',
            prevEl: '.detail-product__left .swiper-button-box-prev',
        },
    });

    /* List voted */
    var list_voted = new Swiper('.list-voted .swiper-container', {
        slidesPerView: 2.8,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: ".list-voted .swiper-pagination",
        },

    });
    /* /List voted */

    /* list_vote */
    var list_vote = new Swiper('.list-vote.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: ".list-vote .swiper-pagination",
        },
        breakpoints: {
            600: {
                slidesPerView: 1,
            }
        }
    });
    /* /list_vote */

    // Close Magnific popup
    $('.back-step').on('click', function() {
        $('#survey').magnificPopup('close');
    });

    /* Hiệu ứng chạy số */
    $('.stat-number').each(function () {
        var $this = $(this);
        var targetText = $this.text().trim(); // ví dụ "50+", "10k+"
        var targetNum = parseInt(targetText.replace(/\D/g, '')); // lấy số nguyên
        var suffix = targetText.replace(/[0-9]/g, ''); // giữ lại ký tự như "+", "k+"

        $({ countNum: 0 }).animate(
            { countNum: targetNum },
            {
            duration: 2000, // thời gian chạy (ms)
            easing: 'linear',
            step: function () {
                $this.text(Math.floor(this.countNum) + suffix);
            },
            complete: function () {
                $this.text(this.countNum + suffix);
            },
            },
        );
    });

    /* /Hiệu ứng chạy số */

    /* QA */
   $('.faq-item:not(.active) .faq-body').hide();

    $('.faq-header').click(function () {
        let $item = $(this).closest('.faq-item');
        let $icon = $(this).find('div');

        if ($item.hasClass('active')) {
            $item.removeClass('active');
            $item.find('.faq-body').slideUp(300);
            $icon.removeClass('icon-minus').addClass('icon-plus');
        } else {
            $('.faq-item').removeClass('active');
            $('.faq-body').slideUp(300);
            $('.faq-header div').removeClass('icon-minus').addClass('icon-plus');

            $item.addClass('active');
            $item.find('.faq-body').slideDown(300);
            $icon.removeClass('icon-plus').addClass('icon-minus');
        }
    });
    /* /QA */

})(jQuery);