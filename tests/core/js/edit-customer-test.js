
phantom.injectJs("./sources/infrastructure/js/test.js");

// prepare the test
testPrepare(
  [
    "./sources/core/js/customer.js",
    "./sources/core/js/new-customer.js",
    "./sources/core/js/edit-customer.js"
  ],
  function () {

    // build the NewCustomer view model
    var newCustomerViewModel = customerModule.makeCustomerViewModel();
    customerModule.extendNewCustomerViewModel(newCustomerViewModel);

    // build the EditCustomer view model
    var editCustomerViewModel = customerModule.makeCustomerViewModel();
    customerModule.extendEditCustomerViewModel(editCustomerViewModel);

    // run the test
    testRun(
      "edit-customer",
      [
        // create a new customer
        testStep(
          newCustomerViewModel,
          function () {

            newCustomerViewModel.firstName("Alice");
            newCustomerViewModel.lastName("Alisson");
            newCustomerViewModel.birthdate("2015-01-01");

            newCustomerViewModel.addShippingAddress();
            newCustomerViewModel.editedShippingAddress.street("123 Sunny Street");
            newCustomerViewModel.editedShippingAddress.city("Miami");
            newCustomerViewModel.editedShippingAddress.state("Florida");
            newCustomerViewModel.editedShippingAddress.submit();

            newCustomerViewModel.submit();

          },
          {
            navigationUrl: "customers.html"
          }),

        // load the customer
        testStep(
          editCustomerViewModel,
          function () {

            var queryString = { "id": "1" };
            editCustomerViewModel.loadPage(queryString);

          },
          {
            customerID: 1
          }),

        // edit the customer
        testStep(
          editCustomerViewModel,
          function () {

            editCustomerViewModel.firstName("Bob");
            editCustomerViewModel.lastName("Bobson");
            editCustomerViewModel.birthdate("2015-02-02");

            editCustomerViewModel.setSelectedShippingAddressID(1);

            editCustomerViewModel.modifyShippingAddress();
            editCustomerViewModel.editedShippingAddress.street("456 Cloudy Boulevard");
            editCustomerViewModel.editedShippingAddress.city("Seattle");
            editCustomerViewModel.editedShippingAddress.state("Washington");
            editCustomerViewModel.editedShippingAddress.submit();

            editCustomerViewModel.submit();

          },
          {
            navigationUrl: "customers.html"
          })
      ]);

  });
