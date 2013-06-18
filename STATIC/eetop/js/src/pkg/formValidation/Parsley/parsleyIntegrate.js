define([
  'jquery', 
  'pkg/formValidation/Parsley/1.1.16/parsley.min', 
  'pkg/formValidation/Parsley/1.1.16/i18n/messages.zh_cn'], 
function($){

  /* configs basic data-api overridable properties */
  /*http://parsleyjs.org/documentation.html#javascript*/
  /*
  inputs: 'input, textarea, select'
  , excluded: 'input[type=hidden]'
  , trigger: false
  , focus: 'first'
  , validationMinlength: 3
  , successClass: 'parsley-success'
  , errorClass: 'parsley-error'
  , validators: {}
  , showErrors: true
  , messages: {}

  //some quite advanced configuration here..
  , validateIfUnchanged: false
  , errors: {                     // specify where parsley error-success classes are set
    classHandler: function ( elem, isRadioOrCheckbox ) {}
  , container: function ( elem, isRadioOrCheckbox ) {}
  , errorsWrapper: '<ul></ul>'
  , errorElem: '<li></li>'
  }
  , listeners: {
      onFieldValidate: function ( elem, ParsleyField ) { return false; }
    , onFormSubmit: function ( isFormValid, event, ParsleyForm ) {}
    , onFieldError: function ( elem, constraints, ParsleyField ) {}
    , onFieldSuccess: function ( elem, constraints, ParsleyField ) {}
  }
  */

  return {
    valid: function(formSelector, configs){
      $(formSelector).parsley(configs || {});
    }
  }

});



