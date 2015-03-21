
registerAlerts
--------------
Given the following HTML:

    <div data-bind="visible:areCustomerAlertsDisplayed">
      <button data-bind="click:hideCustomerAlerts"></button>
      <div data-bind="visible:isOhNoAlertDisplayed">Oh no...</div>
      <div data-bind="visible:isWtfAlertDisplayed">What??</div>
    </div>

This function will inject the required bindings in a view model.  
Here would be a sample call:

    registerAlerts(
      self,
      "CustomerAlerts",
      [
        "OhNoAlert",
        "WftAlert"
      ]);

The injected bindings would be:

    self.areCustomerAlertsDisplayed
    self.hideCustomerAlerts
    self.isOhNoAlertDisplayed
    self.isWtfAlertDisplayed

All the bindings all fully implemented and need not be invoked,  
except when the view model wants to show an alert:

    self.isOhNoAlertDisplayed(true);
