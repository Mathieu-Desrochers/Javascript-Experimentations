#!/bin/bash

function runtest {
  cp /var/databases/customers.db /var/databases/customers.db.bak
  phantomjs ./tests/core/js/$1
  cp /var/databases/customers.db.bak /var/databases/customers.db
}

cp /var/databases/customers.db /var/databases/customers.db.bak

if [ "$?" != "0" ]; then
  exit 1
fi

runtest customers-test.js
runtest edit-customer-test.js
runtest new-customer-test.js

cp /var/databases/customers.db.bak /var/databases/customers.db
