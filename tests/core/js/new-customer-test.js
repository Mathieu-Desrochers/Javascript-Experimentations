
phantom.injectJs("./sources/infrastructure/js/test.js");

// prepare the test
testPrepare(
  [
    "./sources/core/js/customer.js",
    "./sources/core/js/new-customer.js"
  ],
  function () {

    // build the Customer view model
    var customerViewModel = customerModule.makeCustomerViewModel();
    customerModule.extendCustomerViewModel(customerViewModel);

    // run the test
    testRun(
      "new-customer",
      [
        // create a new customer
        testStep(
          customerViewModel,
          function () {

            customerViewModel.firstName("Alice");
            customerViewModel.lastName("Alisson");
            customerViewModel.birthdate("2015-01-01");

            customerViewModel.addShippingAddress();
            customerViewModel.editedShippingAddress.street("123 Sunny Street");
            customerViewModel.editedShippingAddress.city("Miami");
            customerViewModel.editedShippingAddress.state("Florida");
            customerViewModel.editedShippingAddress.submit();

            customerViewModel.submit();

          },
          {
            navigationUrl: "customers.html"
          })
      ]);

  });
