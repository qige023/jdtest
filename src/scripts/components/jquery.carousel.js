define(['jQuery', 'handlebars', 'moderniz', 'utils'], function(jQuery, handlebars, moderniz, utils){
    'use strict';
    var animationendEvents = 'animationend webkitAnimationEnd transitionend webkitTransitionEnd';

    $.fn.carousel = function (navMovies){
        var _current = -1;                                 //当前preview的电影index
        var _currentPreviewStart = 0;                      //下面当前preview滚动的初始电影index
        var _navMovies = $.extend(true, {}, navMovies);    //所有movie信息
        var _carouselInstance = this;

        if(_navMovies.length) {
            throw new Error("Carousel param cannot be an empty array");
        }

        //渲染模板
        var template;
        var templateContainer = $("#carousel-template");
        if(templateContainer.length) {
            template = Handlebars.compile(templateContainer.html());
        } else {
            template = JST["carousel.hbs"];
        }
        var templateHtml = template(_navMovies);
        $(_carouselInstance).html(templateHtml);

        //添加事件响应
        //事件防抖
        var showMoviesDebounce = _.debounce(function(index){
            showMovies(index, true);
        }, 300);

        window.setInterval(function(){
            showMoviesDebounce(getNext(_current));
        }, 5000);

        $("li", _carouselInstance).each(function(){
            $(this).mouseover(function(){
                showMoviesDebounce($(this).attr("movieId"));
            });
        });

        $("a[class=prev]", _carouselInstance).click(function(){
            scrollPrev();
        }).hover(function(){
            $(this).addClass("prevHover");
        }, function(){
            $(this).removeClass("prevHover");
        });

        $("a[class=next]", _carouselInstance).click(function(){
            scrollNext();
        }).hover(function(){
            $(this).addClass("nextHover");
        }, function(){
            $(this).removeClass("nextHover");
        });

        //默认选中数组中第一个元素
        showMovies(0);

        /**
         * 显示指定 movie
         * @param index 所在movie数组索引
         * @param bAnimate 是否触发缓冲特效
         */
        function showMovies( index, bAnimate) {
            bAnimate = bAnimate || false;
            if(_current == index) {
                return;
            }
            var currentMovie = _navMovies["movies"][_current];
            var movie = _navMovies["movies"][index];

            if (movie) {
                $(".desc",_carouselInstance).html(movie["desc"]);
                $("li", _carouselInstance).removeClass("selected");
                $(".selected_triangle",_carouselInstance).remove();

                $("li", _carouselInstance).eq(index).addClass("selected")
                    .append('<div class="selected_triangle"></div>');

                checkAndScrollAuto(index);

                if(bAnimate) {
                    $("a[class*=outgoing]", _carouselInstance).attr({
                        "title": currentMovie["desc"]
                    }).css({
                        "background-image": "url(" + currentMovie["bp"] + ")",
                        "background-color": currentMovie["bgColor"]
                    });

                    //优雅降级，优先使用CSS3 animations
                    if(Modernizr.cssanimations) {
                        $("a[class*=outgoing]", _carouselInstance).addClass("active")
                            .one(animationendEvents, function(){
                                $(this).removeClass("active");
                            });
                    } else {
                        $("a[class*=outgoing]", _carouselInstance)
                            .css({
                                "z-index": 3
                            }).show().fadeOut(500);
                    }
                }

                window.setTimeout(function(){
                    $("a[class*=incoming]", _carouselInstance).attr({
                        "title": movie["desc"]
                    }).css({
                        "background-image": "url(" + movie["bp"] + ")",
                        "background-color": movie["bgColor"]
                    });
                }, 20);

                _current = index;
            } else {
                throw new Error("Array out of bound Error. Index:" + index);
            }
        }

        function checkAndScrollAuto(index) {
            if (index - _currentPreviewStart >= 7 || _currentPreviewStart > index) {
                if (index > _currentPreviewStart) {
                    scrollNext(index - _currentPreviewStart - 6);
                } else {
                    scrollPrev(_currentPreviewStart - index);
                }
            }
        }

        function scrollNext(num) {
            num = num || 2;
            var movies = _navMovies["movies"];
            if(_currentPreviewStart + num >= movies.length - 7) {
                _currentPreviewStart =  movies.length - 7;
            } else {
                _currentPreviewStart = _currentPreviewStart + num;
            }
            scrollPreview(_currentPreviewStart);
        }

        function scrollPrev(num) {
            num = num || 2;
            var movies = _navMovies["movies"];
            if(_currentPreviewStart - num <= movies.length - 1) {
                _currentPreviewStart = 0;
            } else {
                _currentPreviewStart = _currentPreviewStart - num;
            }

            scrollPreview(_currentPreviewStart);
        }

        function scrollPreview (num) {
            var offsetX = -num * 75;
            $("ul", _carouselInstance).animate({left:offsetX +  'px'}, "slow");
        }

        function getNext(index) {
            index = parseInt(index);
            var movies = _navMovies["movies"];
            if(index >= movies.length - 1) {
                return 0;
            }
            return index + 1;
        }

        function getPrev(index) {
            index = parseInt(index);
            var movies = _navMovies["movies"];
            if(index <= 0) {
                return movies.length - 1;
            }
            return index - 1;
        }
    };
});