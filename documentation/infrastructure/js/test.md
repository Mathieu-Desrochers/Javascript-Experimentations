
testStart
---------
Each javascript test should be sent individually to the phantomjs headless browser.

    phantomjs ./tests/core/js/select-customer-test.js

A given test should only call the testStart function.

    phantom.injectJs("./sources/infrastructure/js/test.js");
    testStart(...);

This function will from there on take control of the browser and run the test.  
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
It must end by calling either testPass or testFail.  
This will often occur indirectly though the other functions of this module.

    function () {
      var selectCustomerViewModel = new SelectCustomerViewModel();
      testViewModel(...);
    }

testViewModel
-------------
Performs an action on a view model and tests its resulting state.

__name__  
The name of the test.

    "SelectCustomer"

__viewModel__  
The tested view model.

    selectCustomerViewModel

__action__  
A function that modifies the view model.

    function () { selectCustomerViewModel.loadCustomers(); }

__isWaitOver__  
A function that is polled regularly.  
It must return true when the action has completed.  
The testFail function is called automalically if the wait times out.

    function () { return selectCustomerViewModel.customers().length > 0; }

__expectedState__  
An object against which the view model is compared when the wait is over.  
The testFail function is called automalically if any property is different.

    {
      customers: [
        {
          name: "Alice"
          age: 5.25
        }
      ]
    }

__onSuccess__  
A function that is invoked if the view model matches the extected state.  
It should either continue the test or invoke testPass.

    function () { testPass("SelectCustomer"); }

testPass
--------
Reports the success of a test.  
Also invokes the testEnd function.

__name__  
The name of the test.

    "SelectCustomer"

__side effect__  
Prints the result to the console.

    SelectCustomer: passed


testFail
--------
Reports the failure of a test.  
Also invokes the testEnd function.

__name__  
The name of the test.

    "SelectCustomer"

__side effect__  
Prints the result to the console.

    SelectCustomer: failed

testEnd
-------
Terminates the phantomjs process that is running the test.
