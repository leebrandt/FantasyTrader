# UI/UX Standards Document

## Prerequisites
* [Node](http://nodejs.org)
* [NPM](http://npmjs.com)
* [Bower] (http://bower.io)

## UI Frameworks & Tools
* [AngularJS](http://angularjs.org)
* [UI-Router](http://angular-ui.github.io/ui-router)
* [Bootstrap (SASS)](http://github.com/twbs/bootstrap)
* [FontAwesome](http://fontawesome.io)
* [lodash](https://lodash.com)
* [MomentJS](http://momentjs.com)
* [SnapJS](https://github.com/jakiestfu/Snap.js)
* [toastr](http://codeseven.github.io/toastr)
* [twix](http://isaaccambron.com/twix.js)
* [SASS](http://sass-lang.com)

## Dev/Test Frameworks & Tools
* [GulpJS](http://gulpjs.com)
* [BrowserSync](http://www.browsersync.io)
* [Jasmine](http://jasmine.github.io)
* [Karma](http://karma-runner.github.io)
* [PhantomJS](http://phantomjs.org)

## Responsive Design

## Modular Client-Side Code

## Unit Testing

## Modular SASS [(SMACSS)](https://smacss.com)

## Basic UX Concepts
<dl>
	<dt>Familiarity</dt>
	<dd>People are used to using the web these days. They have a preconceived idea of what a button should look like, what tabs do and how site navigation works. The idea of familiarity (or 'No New Concepts'), is that when a user sees a button, it acts the way they <em>expect</em> a button to act.</dd>
</dl>

## Common Code Styles
* Revealling Module Pattern for Services/Factories

```javascript
	function someService = function($state, $http){
		var getList = function(){
					return $http.get('http://api.com/person');
				},
				getItem = function(){
					var id = $state.params.id;
					return $http.get('http://api.com/person/' + id);
				};

		return{
			GetList: getList,
			GetItem: getItem
		}
	}
```