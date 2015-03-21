
// registers a validation
function registerValidation(viewModel, propertyName, validationFunction) {

  // build the validation
  var validation = {};
  validation.propertyName = propertyName;
  validation.validationFunction = validationFunction;
  validation.isEnabled = ko.observable(false);

  // the validation gets automatically enabled
  // after the property has been edited
  validation.propertyChanged = viewModel[propertyName].subscribe(function () {
    validation.isEnabled(true);
  });

  // returns whether the property is valid
  validation.isValid = ko.computed(function () {
    if (validation.isEnabled() === false) return true;
    return validation.validationFunction();
  });

  // piggyback the validation on the view model
  viewModel.validations = viewModel.validations || [];
  viewModel.validations.push(validation);

  // inject a property to the view model
  // indicating whether the property is valid
  var casedPropertyName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
  viewModel["is" + casedPropertyName + "Valid"] = validation.isValid;

}

// validates a string value
function validateString(value, allowNull) {

  // check for null values
  if (value.trim() === "") {
    return allowNull;
  }

  // the property is valid
  return true;

}

// registers the validation of a string property
function registerStringValidation(viewModel, propertyName, allowNull) {

  // the string validation
  var validationFunction = function () {

    // get the property value
    var value = viewModel[propertyName]();

    // validate the property value
    return validateString(value, allowNull);

  };

  // register the validation
  registerValidation(viewModel, propertyName, validationFunction);

}

// validates an integer value
function validateInteger(value, allowNull, minimumValue, maximumValue) {

  // check for null values
  if (value.trim() === "") {
    return allowNull;
  }

  // match against a numeric regular expression
  var matches = /^([0-9]{1,6})$/.exec(value);
  if (matches === null) {
    return false;
  }

  // check for the minimum and maximum values
  var numericValue = parseInt(matches[0]);
  if (numericValue < minimumValue || numericValue > maximumValue) {
    return false;
  }

  // the property is valid
  return true;

}

// registers the validation of an integer property
function registerIntegerValidation(viewModel, propertyName, allowNull, minimumValue, maximumValue) {

  // the numeric string validation
  var validationFunction = function () {

    // get the property value
    var value = viewModel[propertyName]();

    // validate the property value
    return validateInteger(value, allowNull, minimumValue, maximumValue);

  };

  // register the validation
  registerValidation(viewModel, propertyName, validationFunction);

}

// validates a money value
function validateMoney(value, allowNull, minimumValue, maximumValue) {

  // check for null values
  if (value.trim() === "") {
    return allowNull;
  }

  // match against the money regular expression
  var matches = formatMoneyRegex.exec(value);
  if (matches === null) {
    return false;
  }

  // check for the minimum and maximum values
  var moneyValue = parseInt(matches[0]);
  if (moneyValue < minimumValue || moneyValue > maximumValue) {
    return false;
  }

  // the property is valid
  return true;

}

// registers the validation of a money property
function registerMoneyValidation(viewModel, propertyName, allowNull, minimumValue, maximumValue) {

  // the money validation
  var validationFunction = function () {

    // get the property value
    var value = viewModel[propertyName]();

    // validate the property value
    return validateMoney(value, allowNull, minimumValue, maximumValue);

  };

  // register the validation
  registerValidation(viewModel, propertyName, validationFunction);

}

// validates a time value
function validateTime(value, allowNull) {

  // check for null values
  if (value.trim() === "") {
    return allowNull;
  }

  // match against the time regular expression
  var matches = /^([0-2][0-9]):([0-5][0-9])$/.exec(value);
  if (matches === null) {
    return false;
  }

  // check for the number of hours
  var hours = parseInt(matches[0]);
  if (hours >= 24) {
    return false;
  }

  // the property is valid
  return true;

}

// registers the validation of a time property
function registerTimeValidation(viewModel, propertyName, allowNull) {

  // the time validation
  var validationFunction = function () {

    // get the property value
    var value = viewModel[propertyName]();

    // validate the property value
    return validateTime(value, allowNull);

  };

  // register the validation
  registerValidation(viewModel, propertyName, validationFunction);

}

// validates a selection value
function validateSelection(value, allowNull) {

  // check for undefined or null values
  if (value === undefined || value === null) {
    return allowNull;
  }

  // the property is valid
  return true;

}

// registers the validation of a selection
function registerSelectionValidation(viewModel, propertyName, allowNull) {

  // the selection validation
  var validationFunction = function () {

    // get the property value
    var value = viewModel[propertyName]();

    // validate the property value
    return validateSelection(value, allowNull);

  };

  // register the validation
  registerValidation(viewModel, propertyName, validationFunction);

}

// validates a view model
function performValidations(viewModel) {

  // enable all the validations
  _.each(viewModel.validations, function (validation) {
    validation.isEnabled(true);
  });

  // check whether the view model is valid
  var isViewModelValid = _.every(viewModel.validations, function (validation) {
    return validation.isValid();
  });

  // return whether the view model is valid
  return isViewModelValid;

}

// disables all the validations on a view model
function disableValidations(viewModel) {

  _.each(viewModel.validations, function (validation) {
    validation.isEnabled(false);
  });

}
