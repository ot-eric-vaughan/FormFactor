jQuery.fn.formFactor = function(options){
  var current_form = jQuery(this);
  var form_id = jQuery(this).attr('id');
  
  // Perform auto-focus
  if(options['auto-focus'] == true) jQuery(this).find('input, textarea, select')[0].focus();
  
  // Perform block-leveling of labels
  if(options['top-align-labels'] == true) jQuery(this).find('label').css('display', 'block');
  
  // Perform de-bolding of labels
  if(options['light-labels'] == true) jQuery(this).find('label').css('font-weight', 'normal');
  
  // Array of form focus events that have already been tracked for this pageview.
  var sent = [];
  var fields = [];
  var addField = function(name){if(jQuery.inArray(name, fields) < 0) fields.push(name);}
  
  // Iterate through form elements
  jQuery.each(current_form.find('input, textarea, select'), function(i, elem) {
    if (jQuery(elem).attr('type') != 'hidden'){
      var step_name = jQuery(elem).attr('name');
      addField(step_name);
    }
    
    // Treat submit as de facto last step, write Action name accordingly.
    if(jQuery(elem).attr('type') == 'submit'){
      // Add AJAX POST if desired
      if(options['ajax_post_url']){
        current_form.submit(function(){
          jQuery.ajax({
            url: options['ajax_post_url'],
            type: 'POST',
            data: jQuery(elem).serializeArray(),
            success: options['ajax_post_success'],
            failure: options['ajax_post_failure']
          });
          return false;
        });
      }
      jQuery(elem).click(function(){
        var step = jQuery.inArray(step_name, fields) + 1;
        var not_sent = jQuery.inArray(step_name, sent) < 0;
        if(not_sent) fireTracking(step, 'Form Submitted (button text: "' + jQuery(elem).val() + '")', form_id);
      });
    }
    else{
      if(jQuery(elem).attr('type') == 'radio' || jQuery(elem).attr('type') == 'checkbox'){
        jQuery(elem).change(function(){
          var step = jQuery.inArray(step_name, fields) + 1;
          var not_sent = jQuery.inArray(step_name, sent) < 0;
          // Fire tracking if not already tracked
          if(not_sent) fireTracking(step, step_name, form_id);
        });
      }
      // Treat other form fields as funnel steps.
      else {
        jQuery(elem).focus(function(){
          var step = jQuery.inArray(step_name, fields) + 1;
          var not_sent = jQuery.inArray(step_name, sent) < 0;
          // Fire tracking if not already tracked
          if(not_sent) fireTracking(step, step_name, form_id);
        });
      }
    }
  });
  
  // Send tracking 
  var fireTracking = function(step, name, form_id){
    if(options['GA'] == true) track_GA(step, name);
    if(options['MP'] == true) track_MP(step, name, form_id);
    if(options['DEBUG'] == true) track_DEBUG(step, name, form_id);
    sent.push(name);
    return false;
  }
  
  // Analytics tracking functions
  
  // Google Analytics
  var track_GA = function(step, name) {
    var action = step + ': ' + name;
    try {
      _gaq.push(['_trackEvent', 'Form Completion', action, 'FormFactor: Form Optimization Plugin']);
    }
    catch(e){
      
    }
    return false;
  }
  
  // Mixpanel
  var track_MP = function(step, name, form_id){
    var funnel_name = 'Form ' + form_id;
    var step = parseInt(step);
    try {
      mpmetrics.track_funnel(funnel_name, step, name);
    }
    catch(e){
    
    }
    return false;
  }
  
  // Debug console
  var track_DEBUG = function(step, name, form_id){
    try {
      console.log('Event tracked. Details: "step": ' + step + ' "name": ' + name + ' "form_id": ' + form_id);
    }
    catch(e){
      
    }
    return false;
  }
}

