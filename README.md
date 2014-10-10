# grunt-css-relativisor

This plugin takes any /absolute/ local urls and turns them into relative urls. This is useful if you version your static files and want a generic way to reference relative images correctly.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-relativisor --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-relativisor');
```

*This plugin was designed to work with Grunt 0.4.x.

## css-relativisor task
_Run this task with the `grunt css-relativisor` command._

### Options

#### root

Type: `String`  
Default: `/`

This is a way to filter only what urls get relativised. By default '/' is all there is, but you can change that to only relativise specific urls

#### cwd

Type: `String`  
Default: ``

If you save your css files in a sub directory relative to grunt, use this option to make certain we relativise the path to the correct number of directories

### Usage Examples

#### Replace all /static/ directories to a relative url in *.min.css files
```js
'css-relativisor': {
    default: {
        options: {
            root: "/static/"
        },
        expand: true,
        src: [
            '**/*.min.css'
        ]
    }
}
```
