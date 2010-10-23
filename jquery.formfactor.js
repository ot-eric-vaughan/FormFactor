jQuery.fn.formFactor = function(options){
  var current_page = window.location;
  
  // Array of form focus events that have already been tracked for this pageview.
  var sent = [];
  
  // Iterate through form elements
  $.each($(this).find('input, textarea, select'), function(i, elem) {
    $(elem).focus(function(){
      i++;
      // Fire tracking if not already tracked
      if(sent.indexOf($(elem).attr('name')) < 0){
        if(options['GA'] == true) track_GA(i, $(elem).attr('name'));
        if(options['MP'] == true) track_MP(i, $(elem).attr('name'), $(elem).attr('id'));
        if(options['DEBUG'] == true) track_DEBUG(i, $(elem).attr('name'), $(elem).attr('id'));
        sent.push($(elem).attr('name'));
      }
    });
  });
  
  // Analytics tracking functions
  
  // Google Analytics
  var track_GA = function(step, name) {
    var action = step + ': ' + name;
    try {
      _gaq.push(['_trackEvent', 'Form Completion', action, 'FormFactor: Form Optimization Plugin']);
    }
    catch(e){
      
    }
  }
  
  // Mixpanel
  var track_MP = function(step, name, form_id){
    var funnel_name = 'Form ' + form_id + ' ' + current_page;
    var step = parseInt(step);
    try {
      mpmetrics.track_funnel(funnel_name, step, name);
    }
    catch(e){
    
    }
  }
  
  // Debug console
  var track_DEBUG = function(step, name, form_id){
    try {
      console.log('Event tracked. Details: "step": ' + step + ' "name": ' + name + ' "form_id": ' + form_id + ' "current page": ' + current_page);
    }
    catch(e){
      
    }
  }
}

