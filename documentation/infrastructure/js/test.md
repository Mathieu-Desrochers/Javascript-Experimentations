
testStart
---------
Each javascript test should be sent individually to the phantomjs headless browser.

    phantomjs ./tests/core/js/select-customer-test.js

A given test should only call the testPrepare function.

    phantom.injectJs("./sources/infrastructure/js/test.js");

    // prepare the test
    testPrepare(...);

This function will from thereon take control of the browser and run the test.  
The phantomjs process will then be terminated.

__scripts__  
The scripts that must be included.  
Their path should be relative to the root of the repository.  
All the standard scripts are automatically included.

    [
      "./sources/core/js/select-customer.js"
    ]

__body__  
A function which purpose is to build the tested view models.  
This makes them visible to the testRun function,  
which it has the responsability to invoke.

    function () {

      // build the SelectCustomer view model
      var selectCustomerViewModel = new SelectCustomerViewModel();

      // run the test
      testRun(...);

    }

testRun
-------
Runs a test.

__testName__  
The name of the test.

    "select-customer"

__steps__  
The sequence of steps making up the test.

    [
      // load the customers
      testStep(...),

      // select a customer
      testStep(...)
    ]

testStep
--------
Declares a test step.

__viewModel__  
The tested view model.

    selectCustomerViewModel

__action__  
A function that modifies the view model.

    function () {

      selectCustomerViewModel.loadCustomers();

    }

__expectedState__  
The view model is compared sporadically to this object.  
Once the comparaison returns true, the test continues to the next step.  
Should the comparaison continue returning false after one second, the test fails.

    {
      customers: [
        {
          name: "Alice"
          age: 5.25
        }
      ]
    }
