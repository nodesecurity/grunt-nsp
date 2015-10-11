# grunt-requiresafe
> Checks your package.json / npm-shrinkwrap.json against the requireSafe(+) API for dependencies with known vulnerabilities.


## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.

Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-requiresafe --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.initConfig({
  requiresafe: {
    package: grunt.file.readJSON('package.json')
  }
});

grunt.loadNpmTasks('grunt-requiresafe');
```

## Options
This package supports the following options. At least ONE of the following options is required.

- package (object): The contents of a single package.json file
- shrinkwrap (object): The contents of a single npm-shrinkwrap.json file



