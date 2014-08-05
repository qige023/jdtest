require.config({
    paths: {
        jQuery: '../vendors/jquery/jquery-1.11.1',
        handlebars: '../vendors/handlebarsjs/handlebars-v1.3.0',
        moderniz: '../vendors/moderniz/moderniz'
    },
    priority: [
        "jQuery"
    ]
});

require([
    'jQuery',
    'handlebars',
    'appService',
    'components/jquery.carousel',
    'components/jquery.hotMoviesPanel'
    //此处为执行grunt build 命令时，grunt-targetngmodules处理的代码，仅在dist时生成，用于加载template模块
    /*(if target dist)
     ,'templates/carousel',
     'templates/hotMoviesPanel'
     */
], function(
    jQuery,
    handlebars,
    appService,
    carousel,
    hotMoviesPanel
    /*(if target dist)
     ,carouselTpl,
     hotMoviesPanelTpl
     */
    ) {
    'use strict';
    $(document).ready(function() {
        $.when(appService.getNavMoviesData(), appService.getHotMoviesData())
            .then(function(navMovies, hotMovies){
            $("#carousel").carousel(navMovies);
            $("#hotMoviesContainer").hotMoviesPanel(hotMovies);
        });
    });
});
