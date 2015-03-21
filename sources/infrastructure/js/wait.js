
// waits for a first function to evaluate to true
// before executing a second one
function waitFor(isWaitOver, onWaitOver, onTimeout, pollingInterval, timeoutInterval) {

  // the pending wait tick
  var waitTick;

  // register a timeout tick
  var isTimeoutReached = false;
  var timeoutTick = setTimeout(function () {

    // the timeout has been reached
    isTimeoutReached = true;

    // cancel any pending wait tick
    if (waitTick) {
      clearTimeout(waitTick);
    }

    // signal the timeout
    onTimeout();

  },
  timeoutInterval);

  // waits for one slice of time
  var wait = function () {
    waitTick = setTimeout(function () {

      // check if the first function evaluates to true
      // and invoke the second function
      if (isWaitOver()) {
        clearTimeout(timeoutTick);
        onWaitOver();
        return;
      }

      // check if the timeout has been reached
      // and wait for another slice of time
      if (isTimeoutReached === false) {
        wait();
      }

    },
    pollingInterval);
  };

  // wait for the first slice of time
  wait();

}
