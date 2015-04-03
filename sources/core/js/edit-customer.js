
var customerModule = customerModule || {};

// extends a Customer view model
customerModule.extendCustomerViewModel = function (customerViewModel) {

  var self = customerViewModel;

  // loads the page
  self.loadPage = function (queryString) {

    // parse the query string
    var customerID = parseInt(queryString["id"]);

    // get the customer
    $.ajax({
      type: "GET",
      url: "../api/customers/" + customerID,
      dataType: "json"
    })
    .success(function (response) {

      // set the properties
      self.customerID(customerID),
      self.firstName(response["first-name"]);
      self.lastName(response["last-name"]);
      self.birthdate(response["birthdate"]);

      // build the ShippingAddress view models
      _.each(response["shipping-addresses"], function (shippingAddress) {
        self.shippingAddresses.push(
          customerModule.makeShippingAddressViewModel(
            self,
            shippingAddress["shipping-address-id"],
            shippingAddress["street"],
            shippingAddress["city"],
            shippingAddress["state"]));
      });

    });

  };

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

    // new shipping addresses are tracked using a negative id
    // but the server will identity them by their null id
    var nullifyNegativeShippingAddressID = function (shippingAddressID) {
      return shippingAddressID > 0 ? shippingAddressID : null;
    };

    // put the customer
    $.ajax({
      type: "PUT",
      url: "../api/customers",
      dataType: "json",
      data: JSON.stringify({
        "customer-id": self.customerID(),
        "first-name": self.firstName(),
        "last-name": self.lastName(),
        "birthdate": self.birthdate(),
        "shipping-addresses": _.map(self.shippingAddresses(), function (shippingAddress) {
          return {
            "shipping-address-id": nullifyNegativeShippingAddressID(shippingAddress.shippingAddressID()),
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

// extends a EditCustomer view model
customerModule.extendEditCustomerViewModel = customerModule.extendCustomerViewModel;
