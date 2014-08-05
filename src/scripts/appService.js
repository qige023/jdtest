//封装所有对数据的操作 相当于Module层

define(['jQuery'], function(jQuery){

    function fGetNavMoviesData() {
        var deferred = new $.Deferred();

        $.getJSON('data/nav_movies.json', function(json) {
            if (json) {
                deferred.resolve(json);
            } else {
                deferred.reject();
                alert('AJAX请求失败,请刷新页面重试');
            }
        });

        return deferred;
    }

    function fGetHotMoviesData() {
        var deferred = new $.Deferred();

        $.getJSON('data/hot_movies.json', function(json) {
            if (json) {
                deferred.resolve(json);
            } else {
                deferred.reject();
                alert('AJAX请求失败,请刷新页面重试');
            }
        });

        return deferred;
    }

    return {
        getNavMoviesData : fGetNavMoviesData,
        getHotMoviesData : fGetHotMoviesData
    }

});