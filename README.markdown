!['FormFactor'](http://github.com/markitecht/FormFactor/raw/master/FormFactor.jpg)

# JQuery Form Optimization Plugin

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

GA: boolean. Enables Google Analytics tracking (you must use the [GA asynchronous tracking tag](http://bit.ly/dgzkvC) )

MP: boolean. Enables Mixpanel tracking (you must have an 'mpmetrics' object [initialized in the DOM](http://bit.ly/bsyV3V) )

auto-focus: boolean. Places focus automatically on the first element of your form

## What Gets Tracked? What will I see in my analytics reports?

### Google Analytics

You have, presumably, initialized GA tracking on whatever pages you wish to use FormFactor (otherwise it will not work!).

In the relevant profile, go to *Content* > *Event Tracking*, and specifically the category *Form Completion*. WHOA SWEET!

What you will see in this report is a series of *Actions* that represent steps through the completion of your form. Naturally, each form field is a step, and they go in sequence. They are numbered, based on the order in which they appear in the document, and named, based on the _name_ attribute of each form field.

For the purpose of allowing you to easily filter to see (or hide) FormFactor events in Google Analytics, every event shares the same label: 'FormFactor: Form Optimization Plugin'. It is anticipated that this label will also help other people identify where this data comes from, and what its purpose is. This will come in handy when you are offered several other fancy jobs (as a result of using FormFactor), and your metrics and analytics work is left to some newcomer who will be swamped and perform poorly in your (old) position, never living up to the expectations you so unfairly set before abandoning ship.

### Mixpanel

Similarly to GA, FormFactor requires that you have already initialized a tracking object for Mixpanel on the relevant page(s) on which you wish to use FormFactor.

FormFactor will create a *funnel* for every form *id* that you set up to use FormFactor. Each form field will represent a step in this funnel, proceeding (from beginning to end/goal) in the same order as the fields appear in the document.

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
