# jdtest v0.1.0

> A demo for building scaling website using modern front end techniques.

## Depend

jdtest project is developed by these libraries.     
├── Framework: [jQuery]  (in future maybe using backbone/marionette for views control)   
├── Task Runner: [Grunt]   
├── Module Loader: [Require.js]  
├── Templating Library: [handlebars]  
├── Stylesheet Language: [LESS]  
├── Stylesheet Reset: [normalize]  
├── HTML5's tag Support: [html5shiv]   
└── Characteristics of sniffer: [Moderniz]  

## Demo
See [Demo]  
*because all static respones from github.io has been added*
```shell
    Cache-Control:no-cache
```
*, the Images Cache will always fall. you can customize it in your own Web Server.*


## Getting Started
### Prepare
```shell
    npm install -g supervisor        // 该项用于启动一个node debug服务器，可选
    npm install -g grunt-cli         // 该项用于构建
```
### Build
```shell
    npm install                      // 安装所有构建所需依赖包
    grunt                            // 发布
```
### Run
grunt command will generate directory "build" , it's just static html/css/js files,
for fast deployment, you can use
```shell
    node web-server.js
```
  
in gruntTask, sth has been done for making producing environment's consistent(not to be polluted by build process),so feel free to use src/index.html for develop.

## Features
这里列出本项目的部分特性：  
1.完整的自动化构建流程(模块加载、压缩混淆、内联图片Base64转换、离线存储支持)  
2.采用jQ插件 + handlebar 方式管理 templates  
3.less模块式设计  
4.兼容 IE6+、Chrome、FF  
5.适应多分辨率屏幕
注意：时间所限，IE6下透明PNG图片问题暂未处理，此处可为IE6的图片引用为8位的gif以实现兼容显示。  

## Todo
1.针对移动端(指屏幕宽度)的响应式设计  
2.为IE6 添加8位透明gif支持  
3.采用backbone/marionette进行视图管理  

## License
Source Copyright:
Copyright (c) 2014 qige023. MIT Licensed, see [LICENSE] for details.  
Images Copyright:
All PSD & Images comes from 腾讯视频/京东 UED, you can not put these PSD/images in busyness use.


[jQuery]:http://jquery.com/  
[Grunt]:http://gruntjs.com/  
[Require.js]:http://requirejs.org/
[handlebars]:https://handlebarsjs.com/  
[LESS]:http://lesscss.net/  
[Moderniz]:http://modernizr.com/  
[Demo]:http://qige023.github.io/  
[normalize]:https://github.com/necolas/normalize.css/tree/v1  
[html5shiv]:https://github.com/aFarkas/html5shiv  
[LICENSE]: https://github.com/qige023/jdtest/blob/master/README.md
