# grunt-css-relativisor

** Note, version 1.0 had a major change to the options. Please review them when upgrading

This plugin takes any /absolute/ local urls and turns them into relative urls. It will also rebase any relative urls based on the destination file.
This is useful if you version your static files and want to maintain references to your images/fonts.

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

#### filter

Type: `String`  
Default: `/`

This is a way to filter only what urls get relativised. By default only absolute paths are filtered

#### rebase

Type: `Boolean`
Default: true

This will rebase any relative url to maintain the link to the file in the file system.

#### root

Type: `String`  
Default: process.cwd()

This is where the / path is mapped from the browser on the file system. By default the root is the process.cwd()

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
