# 360 º Dashboard
This  project  aims  to  provide  a  Web  Application  which  comprises  an  overview  of  a  company’s  operations and financial situation through several key performance indicators (KPI’s).  These KPIs have a complete and comprehensive visual representation which simplifies the analysis of the large stream of data inherent to the business, thus easing the  decision-making process.  

To guarantee  a better  user experience,  the  data  is divided  into views,  each aggregating a set of statistics relevant to the topic at hand:  Overview, Finances, Sales, Procurement, and Inventory.

To obtain the data for this project we used a SAF-T (Standard Audit File for Tax) which feeds most of the information necessary. However, given that some sections are not available in said file, an integration with Primavera’s ERP was also implemented, but all authentication data and KPIs calculations are being handled by our own backend service.

## How to Run

In the project directory, you can run:

### `npm run update:dependencies`

Installs or updates the necessary packages to run the project correctly.
Beware that this project requires the [node-gyp library](https://github.com/nodejs/node-gyp) to run, therefore requiring the [installation](https://github.com/nodejs/node-gyp#installation) of some other dependencies, that you may or may not have already installed on your machine.

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run parse`

Runs a script responsible for parsing a saf-t file and creating a database (db.json) with its information.

