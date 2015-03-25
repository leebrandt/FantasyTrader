// conf.js
exports.config = {
  // The file path to the selenium server jar () 
  seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  // seleniumAddress: 'http://localhost:4444/wd/hub', 
  specs: ['src/modules/**/*.spec.js'],
  capabilities: {
    browserName: 'phantomjs',

	  // Can be used to specify the phantomjs binary path.
	  // This can generally be ommitted if you installed phantomjs globally.
	  'phantomjs.binary.path': require('phantomjs').path,

	  // Command line args to pass to ghostdriver, phantomjs's browser driver.
	  // See https://github.com/detro/ghostdriver#faq
	  'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
	},
	
	// A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:3000',
  
  framework: 'jasmine',

  // onPrepare happens when preparing to run the tests
  onPrepare: function() {
	  beforeEach(function() {
	    // things to do before every run
	    this.addMatchers(require('jasmine-expect'));
	  });
	   
	  afterEach(function() {
	    // things to do after every run
	  });
	}
}