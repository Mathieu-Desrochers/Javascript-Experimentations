
make : core infrastructure

core : html js

html : build/en/edit-customer.html \
       build/en/new-customer.html \
       build/fr/edit-customer.html \
       build/fr/new-customer.html

build/en/edit-customer.html : sources/core/html/customer.html \
                              sources/core/html/customer.html.en \
                              sources/core/html/edit-customer.html.en
	cp sources/core/html/customer.html build/en/edit-customer.html
	sed -i 's/$$lang/en/' build/en/edit-customer.html
	sed -i 's/$$page-name/edit-customer/' build/en/edit-customer.html
	while read variable value; do sed -i "s/$$variable/$$value/" build/en/edit-customer.html; done < sources/core/html/customer.html.en
	while read variable value; do sed -i "s/$$variable/$$value/" build/en/edit-customer.html; done < sources/core/html/edit-customer.html.en

build/en/new-customer.html : sources/core/html/customer.html \
                             sources/core/html/customer.html.en \
                             sources/core/html/new-customer.html.en
	cp sources/core/html/customer.html build/en/new-customer.html
	sed -i 's/$$lang/en/' build/en/new-customer.html
	sed -i 's/$$page-name/new-customer/' build/en/new-customer.html
	while read variable value; do sed -i "s/$$variable/$$value/" build/en/new-customer.html; done < sources/core/html/customer.html.en
	while read variable value; do sed -i "s/$$variable/$$value/" build/en/new-customer.html; done < sources/core/html/new-customer.html.en

build/fr/edit-customer.html : sources/core/html/customer.html \
                              sources/core/html/customer.html.fr \
                              sources/core/html/edit-customer.html.fr
	cp sources/core/html/customer.html build/fr/edit-customer.html
	sed -i 's/$$lang/fr/' build/fr/edit-customer.html
	sed -i 's/$$page-name/edit-customer/' build/fr/edit-customer.html
	while read variable value; do sed -i "s/$$variable/$$value/" build/fr/edit-customer.html; done < sources/core/html/customer.html.fr
	while read variable value; do sed -i "s/$$variable/$$value/" build/fr/edit-customer.html; done < sources/core/html/edit-customer.html.fr

build/fr/new-customer.html : sources/core/html/customer.html \
                             sources/core/html/customer.html.fr \
                             sources/core/html/new-customer.html.fr
	cp sources/core/html/customer.html build/fr/new-customer.html
	sed -i 's/$$lang/fr/' build/fr/new-customer.html
	sed -i 's/$$page-name/new-customer/' build/fr/new-customer.html
	while read variable value; do sed -i "s/$$variable/$$value/" build/fr/new-customer.html; done < sources/core/html/customer.html.fr
	while read variable value; do sed -i "s/$$variable/$$value/" build/fr/new-customer.html; done < sources/core/html/new-customer.html.fr

js: build/js/customer.js \
    build/js/edit-customer.js \
    build/js/new-customer.js

build/js/customer.js : sources/core/js/customer.js
	cp sources/core/js/customer.js build/js/

build/js/edit-customer.js : sources/core/js/edit-customer.js
	cp sources/core/js/edit-customer.js build/js/

build/js/new-customer.js : sources/core/js/new-customer.js
	cp sources/core/js/new-customer.js build/js/

infrastructure : build/js/alerts.js \
                 build/js/format.js \
                 build/js/format-en.js \
                 build/js/format-fr.js \
                 build/js/response.js \
                 build/js/validation.js

build/js/alerts.js : sources/infrastructure/js/alerts.js
	cp sources/infrastructure/js/alerts.js build/js/

build/js/format.js : sources/infrastructure/js/format.js
	cp sources/infrastructure/js/format.js build/js/

build/js/format-en.js : sources/infrastructure/js/format.js.en
	cp sources/infrastructure/js/format.js.en build/js/format-en.js

build/js/format-fr.js : sources/infrastructure/js/format.js.fr
	cp sources/infrastructure/js/format.js.fr build/js/format-fr.js

build/js/response.js : sources/infrastructure/js/response.js
	cp sources/infrastructure/js/response.js build/js/

build/js/validation.js : sources/infrastructure/js/validation.js
	cp sources/infrastructure/js/validation.js build/js/

libraries : libraries-bootstrap \
            libraries-bootstrap-datepicker \
            libraries-bootstrap-inputmask \
            libraries-jquery \
            libraries-json \
            libraries-knockout \
            libraries-underscore \
            libraries-uri

libraries-bootstrap :
	cp libraries/bootstrap/css/* build/css/
	cp libraries/bootstrap/img/* build/img/
	cp libraries/bootstrap/js/* build/js/

libraries-bootstrap-datepicker :
	cp libraries/bootstrap-datepicker/css/* build/css/
	cp libraries/bootstrap-datepicker/js/* build/js/

libraries-bootstrap-inputmask :
	cp libraries/bootstrap-inputmask/* build/js/

libraries-jquery :
	cp libraries/jquery/jquery-1.9.1.js build/js/
	cp libraries/jquery/jquery-1.9.1.min.js build/js/

libraries-json : 
	cp libraries/json/json2.js build/js/

libraries-knockout :
	cp libraries/knockout/knockout-2.2.1.js build/js/

libraries-underscore :
	cp libraries/underscore/underscore.js build/js/

libraries-uri :
	cp libraries/uri/uri.js build/js/

tools : tools-phantomjs

tools-phantomjs : tools/phantomjs/phantomjs-1.9.8-linux-x86_64.tar.bz2
	mkdir /tmp/phantomjs
	tar -x -j -f tools/phantomjs/phantomjs-1.9.8-linux-x86_64.tar.bz2 -C /tmp/phantomjs
	cp /tmp/phantomjs/phantomjs-1.9.8-linux-x86_64/bin/phantomjs /usr/local/bin
	rm -r /tmp/phantomjs

install :
	cp -r build/* /usr/local/apache2/htdocs/

build-directories :
	mkdir -p build/css
	mkdir -p build/en
	mkdir -p build/fr
	mkdir -p build/img
	mkdir -p build/js

clean :
	rm -r -f /usr/local/apache2/htdocs/*
	rm -r -f build
