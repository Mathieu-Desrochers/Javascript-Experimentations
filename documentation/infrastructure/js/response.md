
responseContainsError
---------------------
Returns whether the result from an ajax call contains a specific error.  
This function assumes that your webservices signal their errors as follow:

    HTTP/1.1 422 Unprocessable Entity
    Content-Type: application/json; charset=utf-8

    {
      "errors": [
        "unknown-customer-id"
      ]
    }

__response__  
The response returned from the ajax call.

    $.ajax({
    })
    .error(function (response, status, error) {
      responseContainsError(response, "unknown-customer-id");
    });

__result__  
Whether the error was contained.

    true
