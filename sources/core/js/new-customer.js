
var customerModule = customerModule || {};

// extends a Customer view model
customerModule.extendCustomerViewModel = function (customerViewModel) {

  var self = customerViewModel;

  // loads the page
  self.loadPage = function (queryString) { };

  // creates a new customer
  self.submit = function () {

    var allIsGood = true;

    // make sure the view model is valid
    if (performValidations(self) === false) {
      allIsGood = false;
    }

    // make sure there is at least one shipping address
    if (self.shippingAddresses().length === 0) {
      self.isNoShippingAddressesAlertDisplayed(true);
      allIsGood = false;
    }

    // make sure all is good
    if (!allIsGood) {
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
        "shipping-addresses": _.map(self.shippingAddresses(), function (shippingAddress) {
          return {
            "street": shippingAddress.street(),
            "city": shippingAddress.city(),
            "state": shippingAddress.state()
          };
        })
      })
    })
    .success(function (response) {

      // display the customers page
      self.navigationUrl("customers.html");

    });

  };

};

// extends a NewCustomer view model
customerModule.extendNewCustomerViewModel = customerModule.extendCustomerViewModel;
