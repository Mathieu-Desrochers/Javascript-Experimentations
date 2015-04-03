
testStart
---------
Each javascript test should be sent individually to the phantomjs headless browser.

    phantomjs ./tests/core/js/select-customer-test.js

A given test should only call the testStart function.

    phantom.injectJs("./sources/infrastructure/js/test.js");
    testStart(...);

This function will from thereon take control of the browser and run the test.  
The phantomjs process will then be terminated.

__scripts__  
The scripts that must be included.  
Their path should be relative to the root of the repository.  
All the standard scripts are automatically included.

    [
      "./sources/core/js/select-customer.js"
    ]

__test__  
A function that performs the test.  
It usually builds a view model and invokes the testViewModel function

    function () {

      // build the SelectCustomer view model
      var selectCustomerViewModel = new SelectCustomerViewModel();

      // load the customers
      testViewModel(...);

    }

testViewModel
-------------
Performs an action on a view model and tests its resulting state.

__name__  
The name of the test.

    "select-customer"

__viewModel__  
The tested view model.

    selectCustomerViewModel

__action__  
A function that modifies the view model.

    function () { selectCustomerViewModel.loadCustomers(); }

__expectedState__  
The view model is compared sporadically to this object.  
Once the comparaison returns true, the onSuccess function is called.  
Should the comparaison still return false after one second, the testFail function is invoked.

    {
      customers: [
        {
          name: "Alice"
          age: 5.25
        }
      ]
    }

__onSuccess__  
A function that is invoked once the view model matches the extected state.  
It should either continue the test or invoke testPass.

    function () { testPass("SelectCustomer"); }

testPass
--------
Reports the success of a test.  
Terminates the phantomjs process that is running the test.

__name__  
The name of the test.

    "select-customer"

__side effect__  
Prints the result to the console.

    select-customer: passed


testFail
--------
Reports the failure of a test.  
Terminates the phantomjs process that is running the test.

__name__  
The name of the test.

    "select-customer"

__side effect__  
Prints the result to the console.

    select-customer: failed
