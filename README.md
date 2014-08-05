# jdtest v0.1.0

> A demo for building scaling website using modern front end techniques.

## Depend

HiApp are developed using these libraries.     
├── Framework: [jQuery]  (in future maybe using backbone/marionette for views control)   
├── Task Runner: [Grunt]   
├── Module Loader: [Require.js]  
├── Templating Library: [handlebars]  
├── Stylesheet Language: [LESS] 
├── Stylesheet Reset: [normalize]
└── Characteristics of sniffer: [Moderniz] 

## Demo


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

## Details

## License
Source Copyright:
Copyright (c) 2014 qige023. MIT Licensed, see [LICENSE] for details.
Images Copyright:
All PSD & Images comes from 腾讯视频/京东 UED, you can't not use these images for busyness use.


[jQuery]:http://jquery.com/  
[Grunt]:http://gruntjs.com/  
[Require.js]:http://requirejs.org/
[handlebars]:https://handlebarsjs.com/ 
[LESS]:http://lesscss.net/
[Moderniz]:http://modernizr.com/
[normalize]:https://github.com/necolas/normalize.css/tree/v1 
