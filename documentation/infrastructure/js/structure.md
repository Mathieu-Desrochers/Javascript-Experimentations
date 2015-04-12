
Modules
-------
Each page should define a module.  
Here would be the first line of order.js:

    var orderModule = orderModule || {};

View Models
-----------
The module must provide a make function to build its view model:

    // builds an Order view model
    orderModule.makeOrderViewModel = function () {

      var orderViewModelConstructor = function () {

        var self = this;

        // the properties
        self.orderNumber = ko.observable("");
        self.deliveryDate = ko.observable("");
        self.total = ko.observable(0);

      };

      return new orderViewModelConstructor();

    };

Note that the make function does not take any input parameters.

View Models Initialization
--------------------------
If the page needs to be initialized with data from the server,  
it should expose a loadPage function:

    // builds an Order view model
    orderModule.makeOrderViewModel = function () {
      var orderViewModelConstructor = function () {
        ...

        // loads the page
        self.loadPage = function (queryString) {

          // parse the query string
          var orderID = parseInt(queryString["order-id"]);

          // get the order
          $.ajax({
            type: "GET",
            url: "../api/orders/" + orderID,
            dataType: "json"
          })
          .success(function (response) {

            // set the properties
            self.orderNumber(response["order-number"]);
            self.deliveryDate(response["delivery-date"]);
            self.total(response["total"]);

          });

        };

        ...
      };
    };

Child View Models
-----------------
The view models can have children:

    // builds an Order view model
    orderModule.makeOrderViewModel = function () {
      var orderViewModelConstructor = function () {
        ...

        // the child view models
        self.orderLines = ko.observableArray();

        ...
      };
    };

The module must provide make functions to build these child view models:

    // builds an OrderLine view model
    orderModule.makeOrderLineViewModel = function (quantity, item, price) {

      var orderLineViewModelConstructor = function () {

        var self = this;

        // the properties
        self.quantity = ko.observable(quantity);
        self.item = ko.observable(item);
        self.price = ko.observable(price);

      };

      return new orderLineViewModelConstructor();

    };

Note that the make function of child view models can have input parameters.

Child View Models Initialization
--------------------------------
The child view models could be created by the pageLoad function.  
They could also be created from a button click:

    // builds an Order view model
    orderModule.makeOrderViewModel = function () {
      var orderViewModelConstructor = function () {
        ...

        // adds a new order line
        self.addOrderLine = function () {

          // build the OrderLine view model
          self.orderLines.push(
            orderModule.makeOrderLineViewModel(
              14,
              "Pianos",
              5000));

        };

        ...
      };
    };

View Model Binding
------------------
Javascript is used directly in the page to bind the view model:

    <script type='text/javascript' src='../js/order.js'></script>
    <script type='text/javascript'>

      // build the Order view model
      var orderViewModel = orderModule.makeOrderViewModel();

      // load the page
      var queryString = URI.parseQuery(window.location.search);
      orderViewModel.loadPage(queryString);

      // apply the bindings
      ko.applyBindings(orderViewModel));

    </script>

Extending View Models
---------------------
The same view model could be used by two different pages.  
A common example would be:

- new-order.html
- edit-order.html

Both pages could differ only in the way they handle their submission.  
These differences can be injected in the shared view model through extend functions.

Here would be the content of new-order.js:

    // extends a NewOrder view model
    orderModule.extendNewOrderViewModel = function (orderViewModel) {

      var self = orderViewModel;

      // creates a new order
      self.submit = function () {
        ...
      };

    };

    // provide a generic entry point for the page
    orderModule.extendOrderViewModel = orderModule.extendNewOrderViewModel;

And here would be the content of edit-order.js:

    // extends an EditOrder view model
    orderModule.extendEditOrderViewModel = function (orderViewModel) {

      var self = orderViewModel;

      // updates an existing order
      self.submit = function () {
        ...
      };

    };

    // provide a generic entry point for the page
    orderModule.extendOrderViewModel = orderModule.extendEditOrderViewModel;

Extended View Model Binding
---------------------------
Here would be the content of new-order.html:

    <script type='text/javascript' src='../js/order.js'></script>
    <script type='text/javascript' src='../js/new-order.js'></script>
    <script type='text/javascript'>
      ...

      // build the Order view model
      var orderViewModel = orderModule.makeOrderViewModel();
      studentModule.extendStudentViewModel(studentViewModel);

      ...
    </script>

And here would be the content of edit-order.html:

    <script type='text/javascript' src='../js/order.js'></script>
    <script type='text/javascript' src='../js/edit-order.js'></script>
    <script type='text/javascript'>
      ...

      // build the Order view model
      var orderViewModel = orderModule.makeOrderViewModel();
      studentModule.extendStudentViewModel(studentViewModel);

      ...
    </script>

Note the both pages differ only in the second Javascript file they include.
