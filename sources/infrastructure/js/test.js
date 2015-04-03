
function testStart(scripts, test) {

  // create the test page
  var page = require("webpage").create();

  // redirect the browser logs to the console
  page.onConsoleMessage = function (message) {
    console.log(message);
  };

  // respond to the browser messages
  page.onCallback = function (message) {
    if (message === "exit") {
      phantom.exit();
    }
  };

  // open the test page
  page.open("http://localhost/test.html", function () {

    // include the standard scripts
    page.injectJs("./libraries/underscore/underscore.js");
    page.injectJs("./libraries/json/json2.js");
    page.injectJs("./libraries/jquery/jquery-1.9.1.js");
    page.injectJs("./libraries/knockout/knockout-2.2.1.js");
    page.injectJs("./sources/infrastructure/js/alerts.js");
    page.injectJs("./sources/infrastructure/js/compare.js");
    page.injectJs("./sources/infrastructure/js/format.js");
    page.injectJs("./sources/infrastructure/js/format.js.en");
    page.injectJs("./sources/infrastructure/js/response.js");
    page.injectJs("./sources/infrastructure/js/test.js");
    page.injectJs("./sources/infrastructure/js/validation.js");
    page.injectJs("./sources/infrastructure/js/wait.js");

    // include the requested scripts
    for (index = 0; index < scripts.length; index++) {
      page.injectJs(scripts[index]);
    }

    // run the test
    page.evaluate(test);

  });

}

function testViewModel(testName, viewModel, action, expectedState, onSuccess) {

  // perform the action
  action();

  // checks if the expected state has been reached
  var hasReachedExpectedState = function () {

    // resolve the knockout observables on the view model
    var viewModelJS = ko.toJS(viewModel);

    // compare the view model
    var result = compare(viewModelJS, expectedState);
    return result;

  };

  // wait until the expected state is reached
  waitFor(
    hasReachedExpectedState,
    function () {

      // fail the test if the expected state has not been reached
      var success = hasReachedExpectedState();
      if (success === false) {

        testFail(testName);
        return;

      }

      // continue the test
      onSuccess();

    },
    function () {

      // the wait has timed out
      testFail(testName);

    },
    10,
    1000);

}

function testPass(name) {
  console.log(name + ": passed");
  testEnd();
}

function testFail(name) {
  console.log(name + ": failed");
  testEnd();
}

function testEnd(test) {
  window.callPhantom("exit");
}
