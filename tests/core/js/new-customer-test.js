
phantom.injectJs("./sources/infrastructure/js/test.js");

// prepare the test
testPrepare(
  [
    "./sources/core/js/customer.js",
    "./sources/core/js/new-customer.js"
  ],
  function () {

    // build the NewCustomer view model
    var newCustomerViewModel = customerModule.makeCustomerViewModel();
    customerModule.extendNewCustomerViewModel(newCustomerViewModel);

    // run the test
    testRun(
      "new-customer",
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
          })
      ]);

  });
