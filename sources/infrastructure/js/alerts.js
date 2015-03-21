
// registers alerts
function registerAlerts(viewModel, sectionName, alertNames) {

  // inject properties to the view model
  // indicating whether the alerts are displayed
  _.each(alertNames, function (alertName) {
    viewModel["is" + alertName + "Displayed"] = ko.observable(false);
  });

  // inject a property to the view model
  // indicating whether the section is displayed
  viewModel["are" + sectionName + "Displayed"] = ko.computed(function () {

    // check if any alert is displayed
    return _.any(alertNames, function (alertName) {
      return viewModel["is" + alertName + "Displayed"]();
    });

  }, viewModel);

  // inject a function to the view model
  // that can be invoked to hide all the alerts
  viewModel["hide" + sectionName] = function () {

    // hide the alerts
    _.each(alertNames, function (alertName) {
      viewModel["is" + alertName + "Displayed"](false);
    });

  };

}
