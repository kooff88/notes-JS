## 项目启动问题

需要`package.json`文件, 和`Gruntfile.js`文件。

`Gruntfile.js`配置。

```js
module.exports = function (grunt) {
  var configJson = grunt.file.readJSON("package.json");

  // 设置grunt

  grunt.initConfig({
    pkg: configJson,
    requirejs: {
      main: {
        options: {
          baseUrl: "./src",
          out: "./dist/js/xxx.js",
          optimizeCss: "standard",
          mainConfigFile: "./main.js",
          name: "main",
        },
      },

      login: {
        options: {
          baseUrl: "./src",
          out: "./dist/js/xxx.js",
          optimizeCss: "standard",
          mainConfigFile: "./src/login.js",
          name: "login",
        },
      },
      copy: {
        single: {
          expand: true,
          cwd: "./src2",
          src: "**/*",
          dest: "./dist/",
        },
      },
      connect: {
        options: {
          port: 8000,
          hostname: "localhost",
          protocol: "http",
          open: false,
          livereload: false,
          keepalive: true,
          debug: true,
          base: {
            path: "./src",
          },
        },
      },

      proxies: [
        {
          context: "/iaaa",
          host: "192.168.2.1",
          port: "1111",
          https: true,
          xforward: true,
          rewrite: {
            "^/iaaa/": "/iaaa/",
          },
        },
      ],

      request: {
        options: {
          middleware: function (connect, options) {},
        },
      },
      watch: {},
    },
  });
};
```

`package.json` 文件

```json
    "name":"项目名称",
    "description": "项目描述",
    "license":"MIT",
    "version":"1.0.0",
    "devDependencies": {
   	"grunt": "^0.4.5",
		"grunt-cli": "^0.1.13",
		"grunt-connect-proxy": "^0.2.0",
		"grunt-contrib-clean": "^0.6.0",
		"grunt-contrib-connect": "^1.0.2",
		"grunt-contrib-copy": "^1.0.0",
		"grunt-contrib-cssmin": "^2.2.1",
            ...
    }

```
