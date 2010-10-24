# FormFactor: JQuery Form Optimization Plugin

Measure and improve form performance on the web.


## Purpose

1) Provide form completion analytics, integrated with popular modern analytics applications.

2) Provide additional features intended to make deploying HTML web forms easier, faster, more reportable, and more robust.

## Installation Instructions:

1) Make sure you are have JQuery on the page on which you wish to use FormFactor.

2) Include the FormFactor .js, after the JQuery include.

3) Call .formFactor() on the element(s) you wish to optimize

4) Add any required options to the .formFactor() initialization call.


## Options:

In action:

	$('#my-awesome-form').formFactor(
		{
			'GA': true,
			'MP': true,
			'auto-focus': true
		}
	);

GA: boolean. Enables Google Analytics tracking.

MP: boolean. Enables Mixpanel tracking.

auto-focus: boolean. Places focus automatically on the first element of your form

## Requirements:

* Google Analytics: you must use the [GA asynchronous tracking tag](http://bit.ly/dgzkvC).

* Mixpanel: you must have an 'mpmetrics' object [initialized in the DOM](http://bit.ly/bsyV3V).

## Bugs:

[none currently identified]

## Ideas:

* Add form validation support, preferably without rewriting this common functionality.

* Report form validation errors. This could be an extremely useful report for interaction designers.

## Author

[Christopher O'Donnell](http://markitecht.tumblr.com) ([@markitecht](http://twitter.com/markitecht))

## Other

[MIT License](http://www.opensource.org/licenses/mit-license.php)

Copyright (c) 2010, Christopher O'Donnell (markitecht -[at]- gmail [*dot*] com)
