Package.describe({
  name: 'zimolo:multitenancy',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');

  api.use('mizzao:partitioner');

  api.use([
    'accounts-base',
    'accounts-password', // For createUser
    'coffeescript',
    'underscore',
    'ddp', // Meteor.publish available
    'mongo', // Mongo.Collection available
    'tracker' // Deps/Tracker available
  ]);
  api.addFiles('multitenancy.js');

  api.export('ZimoloMT',['client','server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('zimolo:multitenancy');
  api.addFiles('multitenancy-tests.js');
});
