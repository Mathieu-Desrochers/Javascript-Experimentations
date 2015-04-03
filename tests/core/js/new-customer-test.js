
phantom.injectJs("./sources/infrastructure/js/test.js");

testStart(
  [
    "./sources/core/js/customer.js",
    "./sources/core/js/new-customer.js"
  ],
  function () {

    var testName = "new-customer";

    // build the Customer view model
    var customerViewModel = customerModule.makeCustomerViewModel();
    customerModule.extendCustomerViewModel(customerViewModel);

    // create a new customer
    testViewModel(
      testName,
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
      },
      function () { testPass(testName); });

  });
