
			
<div align="center">
  <a href="https://www.government.nl/ministries/ministry-of-foreign-affairs">
    <img src="https://www.government.nl/binaries/svg/content/gallery/government/channel-afbeeldingen/logos/logo-government-of-the-netherlands.svg"/>
  </a>
</div>


#### IATI data Portal for the Dutch Ministry of Foreign Affairs.
--------
This is the Angular.JS User Interface the Dutch Ministry of Foreign Affairs. The http://www.openaid.nl portal has visualized the open data on official development aid projects and programmes executed by the Dutch Ministry of Foreign Affairs. 

This platform extracts the raw IATI data published by the Dutch Ministry of Foreign Affairs from the IATI registry, and presents it in an easy-to-use web interface. It does not alter or interpret the data in any way.

This Angular.JS User Interface makes use of the data-engine [OIPA] (http://www.oipa.nl),  enabling IATI XML compliant data to be parsed and interfaced using the OIPA JSON API.

IATI is a global aid transparency standard and it makes information about aid spending easier to access, re-use and understand the underlying data using a unified open standard. You can find more about the IATA XML standard at: www.iatistandard.org


#### Run locally
1. Download MAMP Free Version https://www.mamp.info/en/
2. Download WordPress version 4.9.6 https://make.wordpress.org/core/tag/4-9-6/
3. Git pull this repository to directory `wp-content/themes/`.
4. Install `bower` in your local machine then install package dependencies with command `bower install` in your terminal.
5. Unzip file `plugins.zip` from this repository on directory `wordpress-plugins`. The unzip will be two directory `angular-wp-api2` and `json-rest-api`, then copy them to directory `wp-content/plugins/`.
6. Run your MAMP, create a database with name `openaid_db` from this http://localhost:8888/MAMP/index.php?page=phpmyadmin&language=English   
7. Rename wp-config-sample.php to wp-config.php, and change `database_name_here` to `openaid_db`, `username_here` to `root`, `password_here` to `root`, if you have others username & password for your MySQL then just change them to yours. 
8. Change default directory MAMP Web-Server to your WordPress folder.
9. Restart your MAMP.
10. Go to http://localhost:8888 and follow step by step the installation WordPress.
11. Go to dashboard WordPress or click this http://localhost:8888/wp-admin/
12. Activate `angular-wp-api2` and `json-rest-api` on this http://localhost:8888/wp-admin/plugins.php
13. If your follow all steps, the repository should be work on http://localhost:8888

#### About the project
--------

* Web Site:         https://www.openaid.nl
* IATI data:  	    http://www.iatiregistry.org/publisher/minbuza_nl
* Data license:    [open license] (http://opendefinition.org/od/2.0/en/)
* OIPA:             [OIPA] (https://github.com/zimmerman-zimmerman/OIPA)
* Authors:          [Zimmerman & Zimmerman ](https://www.zimmermanzimmerman.nl/)
* UI license`BY-NC-SA`:  [Attribution-NonCommercial-ShareAlike](https://github.com/idleberg/Creative-Commons-Markdown/blob/spaces/4.0/by-nc-sa.markdown)
* Github Repo:      https://github.com/zimmerman-zimmerman/openaidNL/
* Bug Tracker:      https://github.com/zimmerman-zimmerman/openaidNL/issues
* Documentation:    https://github.com/zimmerman-zimmerman/openaidNL/wiki

