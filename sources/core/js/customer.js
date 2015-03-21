
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

    // the property validations
    registerStringValidation(self, "street", false);
    registerStringValidation(self, "city", false);
    registerStringValidation(self, "state", false);

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
    self.selectedShippingAddressID = ko.observable(null);
    self.isShippingAddressFormVisible = ko.observable(false);
    self.navigationUrl = ko.observable(null);

    // the child view models
    self.shippingAddresses = ko.observableArray();

    // the property validations
    registerStringValidation(self, "firstName", false);
    registerStringValidation(self, "lastName", false);
    registerStringValidation(self, "birthdate", false);

    // the edited shipping address view model
    self.editedShippingAddress = customerModule.makeShippingAddressViewModel(null, "", "", "");

    // sets the selected shipping address id
    self.setSelectedShippingAddressID = function (shippingAddressID) {

      // clicking the already selected
      // shipping address clears the selection
      if (shippingAddressID === self.selectedShippingAddressID())
      {
        self.selectedShippingAddressID(null);
        return;
      }

      // select the shipping address
      self.selectedShippingAddressID(shippingAddressID);

    };

    // adds a shipping address
    self.addShippingAddress = function () {

      // make sure there is at most 10 shipping addresses
      if (self.shippingAddresses().length === 10) {
        self.isTooManyShippingAddressesDispayed(true);
        return;
      }

      // clear the edited shipping address
      self.editedShippingAddress.shippingAddressID(null);
      self.editedShippingAddress.street("");
      self.editedShippingAddress.city("");
      self.editedShippingAddress.state("");

      // disable the edited shipping address validations
      disableValidations(self.editedShippingAddress);

      // show the shipping address form
      self.isShippingAddressFormVisible(true);

      // clear the selected shipping address id
      self.selectedShippingAddressID(null);

    };

    // modifies the selected shipping address
    self.modifyShippingAddress = function () {

      // make sure a shipping address is selected
      if (self.selectedShippingAddressID() === null) {
        self.isNoSelectedShippingAddressAlertDisplayed(true);
        return;
      }

      // get the selected shipping address
      var selectedShippingAddress = _.find(self.shippingAddresses(), function (shippingAddress) {
        return shippingAddress.shippingAddressID() === self.selectedShippingAddressID();
      });

      // assign its values to the shipping address
      self.editedCourseTypeLevel.shippingAddressID(selectedCourseTypeLevel.shippingAddressID());
      self.editedCourseTypeLevel.street(selectedCourseTypeLevel.street());
      self.editedCourseTypeLevel.city(selectedCourseTypeLevel.city());
      self.editedCourseTypeLevel.state(selectedCourseTypeLevel.state());

      // disable the edited shipping address validations
      disableValidations(self.editedShippingAddress);

      // show the shipping address form
      self.isShippingAddressFormVisible(true);

      // clear the selected shipping address id
      self.selectedShippingAddressID(null);

    };

    // deletes the selected shipping address
    self.deleteShippingAddress = function () {

      // make sure a shipping address is selected
      if (self.selectedShippingAddressID() === null) {
        self.isNoSelectedShippingAddressAlertDisplayed(true);
        return;
      }

      // get the selected shipping address
      var selectedShippingAddress = _.find(self.shippingAddresses(), function (shippingAddress) {
        return shippingAddress.shippingAddressID() === self.selectedShippingAddressID();
      });

      // remove the deleted shipping address
      self.shippingAddresses.remove(selectedShippingAddress);

      // clear the selected shipping address id
      self.selectedShippingAddressID(null);

    };

    // cancels the customer
    self.cancel = function () {

      // display the index page
      self.navigationUrl("index.html");

    };

  }

  return new customerViewModelConstructor();

};
