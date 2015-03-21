
var customerModule = customerModule || {};

// builds a ShippingAddress view model
customerModule.makeShippingAddressViewModel = function (shippingAddressID, street, city, state) {

  function shippingAddressViewModelConstructor() {

    var self = this;

    // the properties
    self.shippingAddressID = ko.observable(shippingAddressID);
    self.street = ko.observable(street);
    self.city = ko.observable(city);
    self.state = ko.observable(state);

  }

  return new shippingAddressViewModelConstructor();

};

// builds a Customer view model
customerModule.makeCustomerViewModel = function() {

  function customerViewModelConstructor() {

    var self = this;

    // the properties
    self.customerID = ko.observable(null);
    self.firstName = ko.observable("");
    self.lastName = ko.observable("");
    self.birthdate = ko.observable("");

    // the states
    self.navigationUrl = ko.observable(null);

    // the child view models
    self.shippingAddresses = ko.observableArray();

    // the property validations
    registerStringValidation(self, "firstName", false);
    registerStringValidation(self, "lastName", false);
    registerStringValidation(self, "birthdate", false);

    // cancels the customer
    self.cancel = function () {

      // display the index page
      self.navigationUrl("index.html");

    };

  }

  return new customerViewModelConstructor();

};
