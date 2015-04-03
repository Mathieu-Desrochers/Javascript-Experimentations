
phantom.injectJs("./sources/infrastructure/js/test.js");

testStart(
  [
    "./sources/core/js/customer.js",
    "./sources/core/js/edit-customer.js",
    "./sources/core/js/new-customer.js"
  ],
  function () {

    var testName = "edit-customer";

    // build the NewCustomer view model
    var newCustomerViewModel = customerModule.makeCustomerViewModel();
    customerModule.extendNewCustomerViewModel(newCustomerViewModel);

    // create a new customer
    testViewModel(
      testName,
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
      function () { return newCustomerViewModel.navigationUrl() !== null; },
      {
        navigationUrl: "customers.html"
      },
      function () {

        // build the EditCustomer view model
        var editCustomerViewModel = customerModule.makeCustomerViewModel();
        customerModule.extendEditCustomerViewModel(editCustomerViewModel);

        // load the customer
        testViewModel(
          testName,
          editCustomerViewModel,
          function () {

            var queryString = { "id": "1" };
            editCustomerViewModel.loadPage(queryString);

          },
          function () { return editCustomerViewModel.customerID() !== null; },
          {
            customerID: 1
          },
          function () {

            // edit the customer
            testViewModel(
              testName,
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
              function () { return editCustomerViewModel.navigationUrl() !== null; },
              {
                navigationUrl: "customers.html"
              },
              function () { testPass(testName); });

          });
      });
  });
