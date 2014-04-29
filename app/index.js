'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var AngularMallzeeModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('Lets generate a new AngularJS Module. Mallzee style.'));

    var prompts = [{
      name: 'moduleName',
      message: 'What would you like to call this module? (e.g. mallzee.services)'
    }, {
      type: 'confirm',
      name: 'hasControllers',
      message: 'Will this module have controllers?',
      default: true
    }, {
      type: 'confirm',
      name: 'hasDirectives',
      message: 'Will this module have directive?',
      default: true
    }, {
      type: 'confirm',
      name: 'hasServices',
      message: 'Will this module have services?',
      default: true
    }, {
      type: 'confirm',
      name: 'hasViews',
      message: 'Will this module have views?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.hasControllers = props.hasControllers;
      this.hasDirectives = props.hasDirectives;
      this.hasServices = props.hasServices;
      this.hasViews = props.hasViews;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('src');
    this.mkdir('tests');

    if (this.hasControllers) {
      this.log('Generating controllers in module ' + this.moduleName);
      this.mkdir('src/controllers');
      this.mkdir('tests/controllers');
      this.template('_controllers.js', 'src/controllers/controllers.js');
    }

    if (this.hasDirectives) {
      this.log('Generating directives in module ' + this.moduleName);
      this.mkdir('src/directives');
      this.mkdir('tests/directives');
      this.template('_directives.js', 'src/directives/directives.js');
    }

    if (this.hasServices) {
      this.log('Generating services in module ' + this.moduleName);
      this.mkdir('src/services');
      this.mkdir('tests/services');
      this.template('_services.js', 'src/services/services.js');
    }

    if (this.hasViews) {
      this.log('Generating views in module ' + this.moduleName);
      this.mkdir('src/views');
    }

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_karma.conf.js', 'karma.conf.js');
    this.copy('Gruntfile.js', 'Gruntfile.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = AngularMallzeeModuleGenerator;