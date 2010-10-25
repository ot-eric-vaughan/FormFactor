!['FormFactor'](http://github.com/markitecht/FormFactor/raw/master/FormFactor.jpg)

# JQuery Form Optimization Plugin

Measure and improve form performance on the web.


## Purpose

1) Provide form completion analytics, integrated with popular modern analytics applications.

2) Provide additional features intended to make deploying HTML web forms easier, faster, more reportable, and more robust.

## Installation Instructions:

1) Make sure you are have JQuery on the page on which you wish to use FormFactor.

2) Include the FormFactor .js, after the JQuery include.

3) Call .formFactor() on the element(s) you wish to optimize.

4) Add any required options to the .formFactor() initialization call.


## Tracking Options:

In action:

	$('#my-awesome-form').formFactor(
		{
			'GA': true,
			'MP': true
		}
	);

GA: boolean. Enables Google Analytics tracking (you must use the [GA asynchronous tracking tag](http://bit.ly/dgzkvC) )

MP: boolean. Enables Mixpanel tracking (you must have an 'mpmetrics' object [initialized in the DOM](http://bit.ly/bsyV3V) )

## What Gets Tracked? What will I see in my analytics reports?

### Google Analytics

You have, presumably, initialized GA tracking on whatever pages you wish to use FormFactor (otherwise it will not work!).

In the relevant profile, go to *Content* > *Event Tracking* > *Categories* > *Form Completion*. WHOA SWEET!

What you will see in this report is a series of *Actions* that represent steps through the completion of your form. Naturally, each form field is a step, and they go in sequence. They are numbered, based on the order in which they appear in the document, and named, based on the _name_ attribute of each form field.

For the purpose of allowing you to easily filter to see (or hide) FormFactor events in Google Analytics, every event shares the same label: 'FormFactor: Form Optimization Plugin'. It is anticipated that this label will also help other people identify where this data comes from, and what its purpose is. This will come in handy when you are offered several other fancy jobs (as a result of using FormFactor), and your metrics and analytics work is left to some newcomer who will be swamped and perform poorly in your (old) position, never living up to the expectations you so unfairly set before abandoning ship.

### Mixpanel

Similarly to GA, FormFactor requires that you have already initialized a tracking object for Mixpanel on the relevant page(s) on which you wish to use FormFactor.

FormFactor will create a *funnel* for every form *id* that you set up to use FormFactor. Each form field will represent a step in this funnel, proceeding (from beginning to end/goal) in the same order as the fields appear in the document.

## Optimization Options

FormFactor exists to not just measure and expose the performance of your web forms, but also to help improve that performance.

In action:

	$('#my-awesome-form').formFactor(
		{
			'auto-focus': true,
			'top-align-labels': true,
			'light-labels': true
		}
	);

auto-focus: boolean. Places focus automatically on the first element of your form.

top-align-labels: boolean. Makes *label* elements block-level. So what? It turns out top-aligned labels [speed up form completion](http://uxmovement.com/design-articles/faster-with-top-aligned-labels). Label your fields like this and it will work beautifully:

	<label>First Name</label>
	<input type="text" name="first-name" value="Christopher" />
	
light-labels: boolean. De-bolds form labels. It turns out that bolding form labels causes the user to take longer to fill out the form [The science](http://www.uxmatters.com/mt/archives/2006/07/label-placement-in-forms.php)
	
## Ajax Options

FormFactor allows you to post the contents of a form to a url asynchronously (AJAX).

In action:

	$('#my-awesome-form').formFactor(
		{
			'ajax_post_url': '/ajax/forms/the-awesome-one',
			'ajax_post_success': function(){
				$('div#form-status').html('Form submitted!');
			},
			'ajax_post_failure': function(){
				alert('Form submission failed!');
			}
		}
	);


## Bugs and Suggestions:

Have an issue? Have an idea? [HOOK A BROTHER UP](http://github.com/markitecht/FormFactor/issues)

## Author

[Christopher O'Donnell](http://markitecht.tumblr.com) ([@markitecht](http://twitter.com/markitecht))

## Other

[MIT License](http://www.opensource.org/licenses/mit-license.php)

Copyright (c) 2010, Christopher O'Donnell (markitecht -[at]- gmail [*dot*] com)
