
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

    });

  };

  // creates a new customer
  self.submit = function () {

    // make sure the view model is valid
    if (performValidations(self) === false) {
      return;
    }

    // post the customer
    $.ajax({
      type: "PUT",
      url: "../api/customers",
      dataType: "json",
      data: JSON.stringify({
        "customer-id": self.customerID(),
        "first-name": self.firstName(),
        "last-name": self.lastName(),
        "birthdate": self.birthdate()
      })
    })
    .success(function (response) {

      // display the index page
      self.navigationUrl("index.html");

    });

  };

};
