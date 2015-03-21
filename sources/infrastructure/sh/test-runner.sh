#!/bin/bash

function runtest {
  cp /var/databases/keeping-afloat.db /var/databases/keeping-afloat.db.bak
  phantomjs ./tests/core/js/$1
  cp /var/databases/keeping-afloat.db.bak /var/databases/keeping-afloat.db
}

cp /var/databases/keeping-afloat.db /var/databases/keeping-afloat.db.bak

if [ "$?" != "0" ]; then
  exit 1
fi

runtest copy-session-test.js
runtest course-schedule-registrations-test.js
runtest course-schedule-student-balances-test.js
runtest course-types-test.js
runtest edit-course-schedule-test.js
runtest edit-course-type-test.js
runtest edit-session-test.js
runtest edit-student-test.js
runtest new-course-schedule-test.js
runtest new-course-type-test.js
runtest new-evaluations-test.js
runtest new-payment-test.js
runtest new-registration-test.js
runtest new-session-test.js
runtest new-student-test.js
runtest search-student-test.js
runtest select-renew-registrations-session-test.js
runtest select-session-test.js
runtest session-registrations-test.js

cp /var/databases/keeping-afloat.db.bak /var/databases/keeping-afloat.db
