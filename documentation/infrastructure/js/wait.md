
waitFor
-------
Waits for a function to return true then invokes a callback.

__isWaitOver__  
A function which is polled regularly.  
It must return true when the wait is over.

    function () {
      return isPageLoaded;
    }

__onSuccess__  
A callback that is invoked when the wait is over.

    function () {
      alert("Page loaded");
    }

__onTimeout__  
A callback that is invoked when the wait times out.

    function () {
      alert("Timeout");
    }

__pollingInterval__  
A number of milliseconds at which the isWaitOver function is polled.

    10

__timeoutInterval__  
A number of milliseconds after which the wait times out.

    5000
