
phantom.injectJs("./sources/infrastructure/js/test.js");

testStart(
  [
    "./sources/core/js/customer.js",
    "./sources/core/js/customers.js",
    "./sources/core/js/delete-customer.js",
    "./sources/core/js/get-customers.js",
    "./sources/core/js/new-customer.js"
  ],
  function () {

    var testName = "customers";

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
      function () {

        // build the Customers view model
        var customersViewModel = customersModule.makeCustomersViewModel();

        // load the customers
        testViewModel(
          testName,
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
          },
          function () {

            // delete the customer
            testViewModel(
              testName,
              customersViewModel,
              function () {

                customersViewModel.setSelectedCustomerID(1);
                customersViewModel.deleteCustomer();

              },
              {
                customers : []
              },
              function () { testPass(testName); });

          });
      });
  });
