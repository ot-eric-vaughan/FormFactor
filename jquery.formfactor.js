jQuery.fn.formFactor = function(options){
  var current_form = $(this);
  var form_id = $(this).attr('id');
  
  // Perform auto-focus
  if(options['auto-focus'] == true) $(this).find('input, textarea, select')[0].focus();
  
  // Perform block-leveling of labels
  if(options['top-align-labels'] == true) $(this).find('label').css('display', 'block');
  
  // Perform de-bolding of labels
  if(options['light-labels'] == true) $(this).find('label').css('font-weight', 'normal');
  
  // Array of form focus events that have already been tracked for this pageview.
  var sent = [];
  var fields = [];
  var addField = function(name){if(fields.indexOf(name) < 0) fields.push(name);}
  
  // Iterate through form elements
  $.each(current_form.find('input, textarea, select'), function(i, elem) {
    var step_name = $(elem).attr('name');
    addField(step_name);
    
    // Treat submit as de facto last step, write Action name accordingly.
    if($(elem).attr('type') == 'submit'){
      // Add AJAX POST if desired
      if(options['ajax_post_url']){
        current_form.submit(function(){
          $.ajax({
            url: options['ajax_post_url'],
            type: 'POST',
            data: $(elem).serializeArray(),
            success: options['ajax_post_success'],
            failure: options['ajax_post_failure']
          });
          return false;
        });
      }
      $(elem).click(function(){
        var step = fields.indexOf(step_name) + 1;
        var not_sent = sent.indexOf(step_name) < 0;
        if(not_sent) fireTracking(step, 'Form Submitted (button text: "' + $(elem).val() + '")', form_id);
      });
    }
    else{
      if($(elem).attr('type') == 'radio' || $(elem).attr('type') == 'checkbox'){
        $(elem).change(function(){
          var step = fields.indexOf(step_name) + 1;
          var not_sent = sent.indexOf(step_name) < 0;
          // Fire tracking if not already tracked
          if(not_sent) fireTracking(step, step_name, form_id);
        });
      }
      // Treat other form fields as funnel steps.
      else {
        $(elem).focus(function(){
          var step = fields.indexOf(step_name) + 1;
          var not_sent = sent.indexOf(step_name) < 0;
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

