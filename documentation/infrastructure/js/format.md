
format
------
Some of the following functions are localized.  
Their implementation depends on which javascript files are included.

Make sure to include this file:

    <script type='text/javascript' src='../js/format.js'></script>

And only one of these files:

    <script type='text/javascript' src='../js/format-en.js'></script>
    <script type='text/javascript' src='../js/format-fr.js'></script>

formatFraction
--------------
Rounds a fractional number to its lowest factor of ¼,  
and formats it to a string.

__number__  
The number to format.

    8.62524

__result__  
The formated number.

    8 ½

formatDayOfWeek
---------------
Formats a day of week.

__dayOfWeek__  
The day of week to format.

    "Sunday"

__result__  
The formatted day of week.

    "Dimanche"

formatMoney
-----------
Formats an amount of money.

__numberOfCents__  
The number of cents.

    1299

__result__  
The formatted amount of money.

    12.99

unformatMoney
-------------
Unformats an anount of money.

__money__  
The formatted amount of money.

    12.99

__result__  
The number of cents.

    1299
