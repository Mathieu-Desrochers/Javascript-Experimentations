
function testPrepare(scripts, body) {

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

    // evaluate the test body
    page.evaluate(body);

  });

}

function testRun(testName, steps) {

  // check if all the steps have been run
  if (steps.length === 0) {

    // the test has passed
    console.log(testName + ": passed");
    window.callPhantom("exit");

  }

  // get the current step
  var step = steps[0];

  // prepare a continuation for the next steps
  var testRunNextSteps = function () {

    // run the next steps
    var nextSteps = _.rest(steps, 1);
    testRun(testName, nextSteps);

  };

  // checks if the expected state has been reached
  var hasReachedExpectedState = function () {

    // resolve the knockout observables on the view model
    var viewModelJS = ko.toJS(step.viewModel);

    // compare the view model to the expected state
    var result = compare(viewModelJS, step.expectedState);
    return result;

  };

  // perform the action
  step.action();

  // wait for the expected state to be reached
  waitFor(
    hasReachedExpectedState,
    function () {

      // fail the test should the expected state
      // have not been reached
      var success = hasReachedExpectedState();
      if (success === false) {

        console.log(testName + ": failed");
        window.callPhantom("exit");

      }

      // continue the test
      testRunNextSteps();

    },
    function () {

      // the wait has timed out
      console.log(testName + ": failed");
      window.callPhantom("exit");

    },
    10,
    1000);

}

function testStep(viewModel, action, expectedState) {

  return {
    viewModel: viewModel,
    action: action,
    expectedState: expectedState
  };

}
