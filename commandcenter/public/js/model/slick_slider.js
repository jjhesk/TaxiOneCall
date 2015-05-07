/**
 * Created by ryo on 14年10月31日.
 */

var SlickApplication = SlickApplication || {};
jQuery(function ($) {
    SlickApplication = function () {
        this.$screen_shot = $("div.slickerslider").css({height: 300, width: 700});
        this.setting = {
            dots: false,
            lazyLoad: 'ondemand',
            slidesToShow: 4,
            slidesToScroll: 2,
            accessibility: false,
            adaptiveHeight: false,
            swipeToSlide: true,
            infinite: true,
            vertical: false,
            //variableWidth: true,
            //autoplay: true,
            //autoplaySpeed: 1000,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        this.$screen_shot.slick(this.setting);
        this.total_slides = 0;
        this.content = [];
    }
    SlickApplication.prototype = {
        clear: function () {
            var d = this, n = $(".slick-track>div", this.$screen_shot).size();
            d.total_slides = n;
            while (d.total_slides > 0) {
                d.$screen_shot.slickRemove(d.total_slides - 1);
                d.total_slides--;
            }
            d.content = [];
        },
        getStringfiedContent: function () {
            var d = this;
            return d.content.join(";_;");
        },
        add_one: function (url) {
            var d = this;
            if (url.trim() != "") {
                d.content.push(url);
                d.$screen_shot.slickAdd(d.construct_el(url));
                d.total_slides++;
            }
        },
        remove_one: function () {
            var d = this;
            if (d.total_slides > 0) {
                d.$screen_shot.slickRemove(d.total_slides - 1);
                d.total_slides--;
                d.content.pop();
            }
        },
        construct_el: function (pic) {
            return '<div style="margin:5px;"><img class="lazy_pic" height="300px" data-lazy="' + pic + '"\/></div>';
        },
        append: function (arrayList) {
            var d = this;
            $.each(arrayList, function (key, pic) {
                d.add_one(pic);
            });
        }
    }
});