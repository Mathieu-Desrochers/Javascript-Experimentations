
// formats an fractional number
function formatFraction(number) {

  if (!number && number !== 0) {
    return "";
  }

  var units = Math.floor(number);
  var decimals = number - units;

  var formattedNumber = units.toString();

  if (decimals >= 0.75) {
    formattedNumber += " ¾";
  }
  else if (decimals >= 0.5) {
    formattedNumber += " ½";
  }
  else if (decimals >= 0.25) {
    formattedNumber += " ¼";
  }

  return formattedNumber;

}

// formats a number of cents
function formatMoneyInternal(numberOfCents, decimalSeparator) {

  if (!numberOfCents && numberOfCents !== 0) {
    return "";
  }

  var stringNumberOfCents = numberOfCents.toString();

  var integer = stringNumberOfCents.substr(0, stringNumberOfCents.length - 2);
  var fractional = stringNumberOfCents.substr(stringNumberOfCents.length - 2);

  var paddedInteger = integer ? integer : "0";
  var paddedFractional = "00".substr(0, 2 - fractional.length) + fractional;

  var result = paddedInteger + decimalSeparator + paddedFractional;

  return result;

}

// unformats a number of cents
function unformatMoney(money) {

  if (!money) {
    return null;
  }

  var stringNumberOfCents = money.replace(/[^0-9]/g, "");

  var numberOfCents = parseInt(stringNumberOfCents);
  return numberOfCents;

}
