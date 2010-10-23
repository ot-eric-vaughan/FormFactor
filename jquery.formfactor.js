jQuery.fn.formFactor = function(options){
  var sent = [];
  // Get all form elements
  $.each($(this).find('input, textarea, select'), function(i, elem) {
    $(elem).focus(function(){
      console.debug(sent.indexOf($(elem).attr('name')));
      if( sent.indexOf($(elem).attr('name')) < 0){
        track(i, $(elem).attr('name'));
        sent.push($(elem).attr('name'));
      }
    });
  });
  
  var track_GA = function(step, name) {
    var action = step + ': ' + name;
    try {
      _gaq.push(['_trackEvent', 'Form Completion', action, 'FormFactor: Form Optimization Plugin']);
    }
    catch(e){
      
    }
  }
  
  var track_MP = function(step, name, form_id){
    var funnel_name = 'Form ' + form_id + ' ' + window.location;
    var step = parseInt(step);
    try {
      mpmetrics.track_funnel(funnel_name, step, name);
    }
    catch(e){
    
    }
  }
}

