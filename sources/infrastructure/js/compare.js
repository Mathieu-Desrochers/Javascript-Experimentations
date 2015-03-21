
function compare(tested, expected) {

  // compare the expected properties
  for (property in expected) {

    // check if the properties exist
    if (!(tested.hasOwnProperty(property) && expected.hasOwnProperty(property))) {
      return false;
    }

    // check if the properties are objects
    if (typeof(tested[property]) === "object" && typeof(expected[property]) === "object") {

      // compare the objects
      if (compare(tested[property], expected[property]) === false) {
        return false;
      }

    } else {

      // compare the primitives
      if (tested[property] !== expected[property]) {
        return false;
      }

    }

  }

  // expected properties were the same
  return true;

}
