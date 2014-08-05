define(['jQuery', 'handlebars', 'utils'], function(jQuery, handlebars, utils) {
    'use strict';

    $.fn.hotMoviesPanel = function (hotMovies){
        var _hotMovies = $.extend(true, {}, hotMovies);    //所有movie信息
        var _hotMoviePanelInstance = this;

        if(_hotMovies.length) {
            throw new Error("Hot Movies Panel param cannot be an empty array");
        }

        //渲染模板
        var template;
        var templateContainer = $("#hotMoviesPanel-template");
        if(templateContainer.length) {
            template = Handlebars.compile(templateContainer.html());
        } else {
            template = JST["hotMoviesPanel.hbs"];
        }
        var templateHtml = template(_hotMovies);
        $(_hotMoviePanelInstance).html(templateHtml);
    };

    //handlebars expression
    Handlebars.registerHelper('hotMoviesPanel_getRank', function (v1) {
        return v1 + 1;
    });

    Handlebars.registerHelper('hotMoviesPanel_getPointPercentage', function (v1) {
        return "%" + (v1 * 100);
    });

    Handlebars.registerHelper('hotMoviesPanel_isNoBoder', function (v1, options) {
        if((v1 + 1) %2 != 0) {
            //继续执行
            return options.fn(this);
        } else {
            //执行else部分
            return options.inverse(this);
        }
    });
});