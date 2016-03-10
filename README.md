# grunt-colorOverlay

> change color of single-color icons(改变单色图标的颜色，不需要导出几套颜色图片，想要什么颜色随心变)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-colorOverlay --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-colorOverlay');
```

windows用户务必安装ImageMagick.exe文件，因为npm安装的imageMagick只是个调用exe程序的包装器，例如本人安装的是ImageMagick-6.9.3-6-Q16-x64-dll. [官网有下载](http://www.imagemagick.org/script/binary-releases.php)。

## The "colorOverlay" task

### Overview
In your project's Gruntfile, add a section named `colorOverlay` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  colorOverlay: {
    default_option: {
      options: {
        color: 'red'
      },
      files: {
        'tmp/red/': ['test/icons/*.png']
      }
    }
  }
});
```

### Options

#### options.color
Type: `String`
Default value: `''`

必须参数，希望图标叠加的颜色值，可以是支持各种颜色格式，包括颜色关键字

#### options.filenameMap
Type: `Function`
Default value: `function(filename) { return filename; }`

对文件名进行处理，返回新的文件名

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  colorOverlay: {
    red: {
      options: {
        color: 'red'
      },
      files: {
        'tmp/red/': ['test/icons/*.png']
      }
    },
    blue: {
      options: {
        color: '#00A1F2',
        filenameMap: function(filename) {
          // 和下面的任务使用同一个文件夹，但是名称不一样
          return 'blue.' + filename;
        }
      },
      files: {
        'tmp/mixed/': ['test/icons/*.png']
      }
    },
    disabled: {
      options: {
        color: '#C1C6D2',
        filenameMap: function(filename) {
          return 'disabled.' + filename;
        }
      },
      files: {
        'tmp/mixed/': ['test/icons/*.png']
      }
    }
  }
});
```

#### Custom Options

上面例子3个任务，分别对原图片转换成红色，蓝色以及灰色三套图标。其中红色任务在red文件夹下面，图片文件名称和原来的一样；蓝色和禁用任务放在同一个名为mixed的文件夹，但是，通过文件名称进行区分，分别是<code>blue.</code>和<code>disabled.</code>前缀。

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
