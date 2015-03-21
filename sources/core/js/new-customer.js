
var customerModule = customerModule || {};

// extends a Customer view model
customerModule.extendCustomerViewModel = function (customerViewModel) {

  var self = customerViewModel;

  // loads the page
  self.loadPage = function (queryString) {

  };

  // creates a new customer
  self.submit = function () {

    // make sure the view model is valid
    if (performValidations(self) === false) {
      return;
    }

    // post the customer
    $.ajax({
      type: "POST",
      url: "../api/customers",
      dataType: "json",
      data: JSON.stringify({
        "first-name": self.firstName(),
        "last-name": self.lastName(),
        "birthdate": self.birthdate(),
        "shipping-address": {
          "street": "123 Sunny Street",
          "city": "Miami",
          "state": "Florida"
        }
      })
    })
    .success(function (response) {

      // display the index page
      self.navigationUrl("index.html");

    });

  };

};
