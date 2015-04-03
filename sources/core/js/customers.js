
var customersModule = customersModule || {};

// builds a Customer view model
customersModule.makeCustomerViewModel = function (parentViewModel, customerID, firstName, lastName) {

  function customerViewModelConstructor() {

    var self = this;

    // the properties
    self.customerID = ko.observable(customerID);
    self.firstName = ko.observable(firstName);
    self.lastName = ko.observable(lastName);

    // the states
    self.isSelected = ko.observable(false);

    // subscribe to the change of selected customer
    parentViewModel.selectedCustomerID.subscribe(function (newCustomerID) {
      self.isSelected(newCustomerID === self.customerID());
    });

  }

  return new customerViewModelConstructor();

}

// builds a Customers view model
customersModule.makeCustomersViewModel = function () {

  function customersViewModelConstructor() {

    var self = this;

    // the states
    self.selectedCustomerID = ko.observable(null);
    self.navigationUrl = ko.observable(null);

    // the child view models
    self.customers = ko.observableArray();

    // the alerts
    registerAlerts(
      self,
      "CustomerAlerts",
      [
        "NoCustomerSelectedAlert"
      ]);

    // loads the page
    self.loadPage = function () {

      // get the customers
      $.ajax({
        type: "GET",
        url: "../api/customers",
        dataType: "json"
      })
      .success(function (response) {

        // build the customer view models
        _.each(response["customers"], function (customer) {
          self.customers.push(
            customersModule.makeCustomerViewModel(
              self,
              customer["customer-id"],
              customer["first-name"],
              customer["last-name"]));

        });

        // sort the customers
        self.customers.sort(function (x, y) {
          var xFullName = x.firstName() + " " + x.lastName();
          var yFullName = y.firstName() + " " + y.lastName();
          return xFullName.localeCompare(yFullName);
        });

      });

    };

    // sets the selected customer id
    self.setSelectedCustomerID = function (customerID) {

      // clicking the already selected
      // customer clears the selection
      if (customerID === self.selectedCustomerID())
      {
        self.selectedCustomerID(null);
        return;
      }

      // select the customer
      self.selectedCustomerID(customerID);

    };

    // adds a customer
    self.addCustomer = function () {

      // display a new customer
      self.navigationUrl("new-customer.html");

    };

    // modifies a customer
    self.modifyCustomer = function () {

      // make sure a customer is selected
      if (self.selectedCustomerID() === null) {
        self.isNoCustomerSelectedAlertDisplayed(true);
        return;
      }

      // display the customer
      self.navigationUrl(
        "edit-customer.html?" +
        "id=" + self.selectedCustomerID());

    };

    // deletes a customer
    self.deleteCustomer = function () {

      // make sure a customer is selected
      if (self.selectedCustomerID() === null) {
        self.isNoCustomerSelectedAlertDisplayed(true);
        return;
      }

      // delete the customers
      $.ajax({
        type: "DELETE",
        url: "../api/customers/" + self.selectedCustomerID()
      })
      .success(function (response) {

        // get the deleted customer
        var deletedCustomer = _.find(self.customers(), function (customer) {
          return customer.customerID() == self.selectedCustomerID();
        });

        // remove the deleted customer
        self.customers.remove(deletedCustomer);

        // clear the selected customer id
        self.setSelectedCustomerID(null);

      });

    };

  }

  return new customersViewModelConstructor();

}
