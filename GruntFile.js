module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n'
            + ' * jDTest v<%= pkg.version %>\n'
            + ' * <%= grunt.template.today("yyyy-mm-dd") %>\n'
            + ' */',

        // Task configuration
        clean: {
            build: ['build'],
            scripts4build: ['src/temp_scripts']
        },

        // 编译less文件
        less: {
            compileCore: {
                options: {
                    strictMath: false
                },
                files: {
                    'src/styles/css/<%= pkg.name %>.css': 'src/styles/less/jdtest.less'
                }
            },
            minify: {
                options: {
                    cleancss: true,
                    report: 'min'
                },
                files: {
                    'src/styles/css/<%=pkg.name%>.min.css': 'src/styles/css/<%=pkg.name%>.css'
                }
            }
        },

        imageEmbed: {
            dist: {
                src: [ "src/styles/css/<%=pkg.name%>.css" ],
                dest: "src/styles/css/<%=pkg.name%>.css",
                options: {
                    deleteAfterEncoding : false
                }
            }
        },

        //为src/scripts/app.js的开发版本引入html2js转换后的modules
        targetngmodules: {
            dist: {
                files: {
                    'src/temp_scripts/main.js': 'src/temp_scripts/main.js'
                }
            }
        },

        // 合并压缩js文件
        requirejs: {
            compile: {
                options: {
                    preserveLicenseComments: false,
                    baseUrl: 'src/temp_scripts',
                    mainConfigFile: 'src/temp_scripts/main.js',
                    name: 'main',
                    out: 'build/scripts/jdtest.min.js'
                }
            }
        },

        uglify: {
            // 压缩require.js文件
            minifyRequirejs : {
                options: {
                    compress: true
                },
                src: 'src/vendors/requirejs/require.js',
                dest: 'build/scripts/require.min.js'
            },
            html5shiv : {
                options: {
                    compress: true
                },
                src: 'src/vendors/html5shiv/html5shiv.js',
                dest: 'build/vendors/html5shiv/html5shiv.js'
            }
        },

        // 发布html文件，去掉开发标记
        targethtml: {
            dist: {
                files: {
                    'build/index.html': 'src/index.html'
                }
            }
        },
        copy: {
            scripts4build: {
                expand: true,
                cwd: 'src/scripts',
                src: ['**'],
                dest: 'src/temp_scripts'
            },
            css: {
                expand: true,
                cwd: 'src/styles/css',
                src: ['jdtest.min.css'],
                dest: 'build/styles/css'
            },
            images: {
                expand: true,
                cwd: 'src/styles/images',
                src: ['**'],
                dest: 'build/styles/images'
            },
            data: {
                expand: true,
                cwd: 'src/data',
                src: ['**'],
                dest: 'build/data'
            }
        },

        //see https://github.com/gunta/grunt-manifest
//        manifest: {
//            generate: {
//                options: {
//                    basePath: 'build',
//                    preferOnline: true,
//                    verbose: false,
//                    timestamp: true
//                },
//                src: [
//                    'scripts/*.min.js',
//                    'styles/css/*',
//                    'styles/fonts/*',
//                    'styles/img/*'
//                ],
//                dest: 'build/manifest.appcache'
//            }
//        },

        // 压缩成zip
//        compress: {
//            main: {
//                options: {
//                    archive: 'build/<%=pkg.name%>.zip',
//                    mode: 'zip'
//                },
//                files: [
//                    {expand: true, cwd: 'build/', src: ['**']}
//                ]
//            }
//        },

        //预编译handlebars的模板文件
        handlebars: {
            compile: {
                options: {
                    namespace: "JST",
                    amd: "",
                    processName: function(filePath) {
                        var pieces = filePath.split("/");
                        return pieces[pieces.length - 1]; // output: _header.hbs
                    }
                },
                files: {
                    "src/temp_scripts/templates/carousel.js": "src/templates/carousel.hbs",
                    "src/temp_scripts/templates/hotMoviesPanel.js": ["src/templates/hotMoviesPanel.hbs"]
                }
            }
        },


        // 自动构建，用于测试修改
        // 在命令行中输入:grunt watch，来监听文件修改
        watch: {
            less: {
                files: ['src/styles/less/**/*.less'],
                tasks: ['less']
            }
        }
    });

    // Load plugin tasks
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-targetngmodules');
    grunt.loadNpmTasks("grunt-image-embed");

//    grunt.loadNpmTasks('grunt-manifest');
//    grunt.loadNpmTasks('grunt-contrib-compress');


    grunt.registerTask('default', [
        'clean:build',
        'less:compileCore',
        //将stylesheet中的images引用使用base64方式嵌入
        'imageEmbed',
        'less:minify',
        //将scripts拷贝到temp_scripts文件夹中以构建scripts
        'copy:scripts4build',
        //生成引入template模板js的main.js
        'targetngmodules',
        'handlebars',
        'requirejs',
        'uglify:minifyRequirejs', 'uglify:html5shiv',
        'targethtml',
        'copy:css', 'copy:images', 'copy:data',
        //清空脚本构建文件夹temp_scripts
        'clean:scripts4build'

        //在build目录生成Html5离线存储所必须的资源描述文件
//        'manifest',
//        'compress'
    ]);
};