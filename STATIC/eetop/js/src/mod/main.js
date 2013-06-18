
require(['jquery', 'parsley'], function($, parsley){

  parsley.valid('#demo-form', {
    listeners: {
      onFormSubmit: function(isValid, e, form){
        if(isValid === true){
          alert('good');
          event.preventDefault();
        }
      }
    }
  });

});



