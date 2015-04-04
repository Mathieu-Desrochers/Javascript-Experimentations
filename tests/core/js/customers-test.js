
phantom.injectJs("./sources/infrastructure/js/test.js");

// prepare the test
testPrepare(
  [
    "./sources/core/js/customer.js",
    "./sources/core/js/customers.js",
    "./sources/core/js/new-customer.js"
  ],
  function () {

    // build the Customer view model
    var customerViewModel = customerModule.makeCustomerViewModel();
    customerModule.extendCustomerViewModel(customerViewModel);

    // build the Customers view model
    var customersViewModel = customersModule.makeCustomersViewModel();

    // run the test
    testRun(
      "customers",
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
          }),

        // load the customers
        testStep(
          customersViewModel,
          function () {

            customersViewModel.loadPage();

          },
          {
            customers : [
              {
                customerID: 1,
                firstName: "Alice",
                lastName: "Alisson"
              }
            ]
          }),

        // delete the customer
        testStep(
          customersViewModel,
          function () {

            customersViewModel.setSelectedCustomerID(1);
            customersViewModel.deleteCustomer();

          },
          {
            customers : []
          })
      ]);

  });
