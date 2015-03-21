
function responseContainsError(response, error) {

  // check whether the server has rejected the response
  if (response.status === 422) {

    // parse the response errors
    var errors = JSON.parse(response.responseText).errors;

    // build a regular expression
    // from the specified error
    var errorRegExp = new RegExp(error);

    // search among the response errors
    var errorWasFound = _.any(errors, function (error) {
      return errorRegExp.test(error);
    });

    // return whether the error was found
    return errorWasFound;

  }

  // an unexpected error has occurred
  return false;

}
