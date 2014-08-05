define([], function(){
    'use strict';
    //utils from underScoreJS
    window._ = window._ || {};

    _.now = Date.now || function() { return new Date().getTime(); };

    _.debounce = function(func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function() {
            var last = _.now() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    context = args = null;
                }
            }
        };

        return function() {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    };


    //handlebars expression
    Handlebars.registerHelper('compare_lt', function (v1, v2, options) {
        v1 = parseFloat(v1);
        v2 = parseFloat(v2);
        if (v2 > v1) {
            //继续执行
            return options.fn(this);
        } else {
            //执行else部分
            return options.inverse(this);
        }
    });

    //handlebars expression
    Handlebars.registerHelper('compare_gt', function (v1, v2, options) {
        v1 = parseFloat(v1);
        v2 = parseFloat(v2);
        if (v2 <= v1) {
            //继续执行
            return options.fn(this);
        } else {
            //执行else部分
            return options.inverse(this);
        }
    });
});