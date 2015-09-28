<h2>SENSYF-WEBPORTAL DEMO 2.0- MOUNT A DEMONSTRATIVE WEB PORTAL</h2>

Version 2.0 of the Skeleton of the SenSyF Demonstrative Web Portal including WPS client

----------------------------------------------------------------------------------------------------------------------

The content of this README is also presented on the manual page of the tool.
The code inside the files, which will be downloaded to your system, contains comments to help you with the instructions described during this README.

----------------------------------------------------------------------------------------------------------------------

<h3>DESCRIPTION</h3>

The new version of the SenSyF SDK tool (sensyf-webportal.2.0) is a dissemination tool which helps the users to display their final results in a more appellative way.
With the download of this set of files (sensyf-webportal2.0), the user has the skeleton of a Web Portal which is used, in the SDK context, to demonstrate the processing power and the scalability of the SenSyF Platform.
This Web Portal was originally created to display the outputs of a usecase that detects the oil spills on the Mediterranean Sea by using, as input, SENTINEL-1 SAR data.

The new version of the Web Portal contains three main parts which are:

- WPS Client (jquery-wps-client) - Reuses the application code made available as part of the Developer Cloud Sandbox's Dashboard (invoke tab), providing the WPS Client fields to type the initial parameters, and a button "Start Test" which, when pressed, starts an application workflow configured for exposing the WPS interface.

- Embedded Map (Google Maps API) - In this Google Maps instance are displayed the outputs of the workflow. In the original case, the outputs are KML files containing the oil spills detected. During the run, each time an oil spill is detected, a marker will appear and, when clicked, a zoom in will occur and the KML is loaded (the oil leakage can be watched over the map).

- Processing Time and Cost counter - In this section the user can follow the processing time and the associated cost during the workflow run.

The original usecase is just an idea of how this Web Portal can be used to disseminate the outputs of a workflow. The folders and files installed are only the skeleton of the Web Portal and do not allow to test the oil spill usecase. The idea is to give to the users a baseline to build their own Web Portals adapted to their usecases. The following sections will drive the user and help them with the Web Portal development.

----------------------------------------------------------------------------------------------------------------------

<h3>ACCESS SENSYF-WEBPORTAL</h3>

The sensyf-webportal tool is available through a GitHub repository which can be cloned in order to make the Web Portal skeleton available in the user environment.

To have access to the sensyf-webportal demo **click the button "Download ZIP"** or **clone the repository** in your environement.

The structure mounted in the user environment is presented on the section "Structure & Definitions".

----------------------------------------------------------------------------------------------------------------------

<h3>REQUIREMENTS</h3>

The python modules listed below shall be installed:

  - Flask

To install flask on your environment try:
  ```bash
  $ sudo easy_install virtualenv
  ```
or even better:
  ```bash
  $ sudo pip install virtualenv
  ```
If you use Ubuntu, try:
  ```bash
  $ sudo apt-get install python-virtualenv
  ```
or:
  ```bash
  $ sudo apt-get install python-flask
  ```
----------------------------------------------------------------------------------------------------------------------

<h3>STRUCTURE & DEFINITIONS</h3>

The skeleton of the Demonstrative Web Portal follows the structure presented below.

  ```bash
  /static/                  
     /jquery-wps-client/   
     /pics/                
     /webportal.css        
     /webportal.js         

 /templates/               
     /webportal.html       

 app.py     
  ```
Each component of the structure has a different meaning and feature for the operation of the Web Portal.

**static -** This directory contains basically all the functions of the Web Portal contained into the JavaScript file (webportal.js).
It also contains the CSS file which describe the formatting and fonts of the portal (webportal.css).

**jquery-wps-client -** This directory is placed inside static directory and contains all the javascript files, css files and imports which allow the connection between the Web Portal and the sandbox/cluster. This connection is done by using the WPS interface of the Sandbox and a WPS client.

**pics -** This folder contains all the pics presented on the Web Portal (e.g. background pic, sensyf icons, company_logos, etc.).


**templates -** This directory contains the new HTML file that builds the Web Portal and connects buttons to their correspondent functions described on the JavaScript files.
Basically, the webportal.html is the face of the new Web Portal.


**app.py -** This Python file uses "*Flask*" which is a Python Web Application Framework which allows to have a simple app up and running. The creation and use of this applications will be better explained on the section "*FLASK CONCEPT*".

----------------------------------------------------------------------------------------------------------------------

<h3>ADAPTATIONS</h3>

Starting with the Web Portal skeleton, the users can adapt it in order to make it a good dissemination platform for their services. Many adaptations can be performed and they can be divided into three groups:

<h4>Formatting & Style</h4>
 
Regarding the formatting and Style of the WebPortal, the font, size and color of the text presented on the portal can be defined/changed on the file webportal.css (/static/webportal.css).

This is a regular CSS file where are defined the text style for each level defined on the HTML (e.g. headers < h1 >, < h2 >; paragraph < p >).

The background image is also defined on this file. To change the background image the developer shall place the new image inside the directory /static/pics and change the image path into the webportal.css (/static/webportal.css).

**IMPORTANT:** This file webportal.css (/static/webportal.css) shall be "imported" in the file webportal.html (/templates/webportal.html):

```HTML
<link type="text/css" rel="stylesheet" href="/static/webportal.css" />
```

Considering that the webportal.html (/templates/webportal.html) is the face of the Web Portal, other changes regarding the aspect and the sections of the portal can be changed updating this file.

As it was explained in the section DESCRIPTION, the portal has three main sections. The WPS Client and the Map are implemented, respectively, into the jquery-wps-client files and into the Google Maps API. To have them available into the webportal.html, some "imports" shall be done at the beggining of the file. Check the two HTML line below which can be found into the webportal.html file (/templates/webportal.html):

```HTML
<script type="text/javascript" src="/static/jquery-wps-client/js/jquery.wps.client.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
```

If, for example, the user wants to display the results of a workflow using a different solution, it is possible to take off the map and add a different section. Beyond the "imports", the two sections (WPS Client and Map) are declared in the HTML code, by the following code lines that can be checked into the the webportal.html file (/templates/webportal.html):

```HTML
<div id="myWpsDiv"></div>
<div id="map-canvas"></div>
```

Inside these sections it is possible to change their aspect by using HTML flags and tags.

The third section is a new function implemented on this Webportal Skeleton. The Processing Time and Cost counter allows the user to follow the run time and the associated cost. This new feature gets the number of nodes of the sandbox/cluster through the IP (must be manually inserted by the user on the file app.py, into the function find_num_nodes).

<h4>Javascript Functions</h4>
 
Basically, the JavaScript functions are what define the behavior of each element of the portal defined in the HTML file. The JavaScript files (js) are all contained into the static directory.

Inside /static/ we have the jquery-wps-client where is implemented the WPS Client (check JQUERY-WPS-CLIENT), which allows the connection between portal and sandbox/cluster and the webportal.js file where shall be implemented all the functions related with the Web Portal.

Inside the webportal.js file (/static/webportal.js), the user can find the initialization of the WPS Client. On this version 2.0 contains also the function for the time and cost counter. Every javascript functions related with the portal shall be placed here. For example, for the oil spill usecase, two functions were placed into this file (one to receive the workflow outputs and other to display them on the map).

**IMPORTANT:** This file webportal.js (/static/webportal.js) shall be "imported" in the file webportal.html (/templates/webportal.html):

```HTML
<script type="text/javascript" src="/static/webportal.js"></script>
```

**Note 1:** If you want to know more about how to display kml files on a map via JavaScript, raise a ticket assigned to the SenSyF SDK Team

**Note 2:** Unlike the WPS Client, the map is initialized into the webportal.html file. To change the map options the user shall update the function "initialize" into webportal.html

<h4>External Functions</h4>

The concept of "external functions" includes all the functions that are not Javascript functions (e.g. python functions). For example, the oil spill usecase has the need of check the workflow outputs inside a URL. This can be done by using python and the function that contains the procedure was placed into the file app.py.

All the external functions shall be placed into this file. The returns of these functions can be passed to the JavaScrip functions by using JSON from Flask (check the section FLASK CONCEPT).

The file app.py, which allows to have a simple app up and running, will be better explained in the section "*FLASK CONCEPT*". To learn how to run the app created check the section "*RUN EXAMPLE*".

----------------------------------------------------------------------------------------------------------------------

<h3>JQUERY-WPS-CLIENT</h3>

A visual interactive webapp client to OGC Web Processing Service developed as jQuery plugin.

This section explains how is done the connection between the Web Portal and the sandbox/cluster. This connection is already done in the installed skeleton, however, it is important to explain how the WPS Client works.

<h4>Application Rule</h4>
 
To trigger a workflow from the Web Portal, by using the WPS interface of the Sandbox and a WPS client, it is strictly necessary to write properly the application.xml in order to be ingested from the WPS server running on the sandbox/cluster.

The condition is to have inside the application descriptor (application.xml), at least, an "open search" parameter in the first job. In the oil spill usecase the "open search" parameters are the 'Time Start' and the 'Time End' to limit the query of SENTINEL-1 data into the SenSyF catalogue.

**EXAMPLE:**

```HTML
<parameter id="time_start" title="Time Start" abstract="Time start to search inputs" scope="runtime" type="opensearch" target="time:start"></parameter>
<parameter id="time_end" title="Time End" abstract="Time end to search inputs" scope="runtime" type="opensearch" target="time:end"></parameter>
```
Without this, it is impossible to have an application exposed as a WPS Service.

<h4>JQUERY-WPS-CLIENT CONFIGURATION</h4>

The following js/css dependencies were included into the webportal.html (/templates/webportal.html):

```HTML
<link type="text/css" rel="stylesheet" href="/static/jquery-wps-client/_imports/css/ui-lightness/jquery-ui.css" />
<link type="text/css" rel="stylesheet" href="/static/jquery-wps-client/_imports/css/bootstrap.css" />
<link type="text/css" rel="stylesheet" href="/static/jquery-wps-client/_imports/css/bootstrap-responsive.css" />
<link type="text/css" rel="stylesheet" href="/static/jquery-wps-client/_imports/css/jquery.loadmask.css" />
<link type="text/css" rel="stylesheet" href="/static/jquery-wps-client/_imports/css/prettify.css" />
<link type="text/css" rel="stylesheet" href="/static/jquery-wps-client/_imports/css/index.css" />
<link type="text/css" rel="stylesheet" href="/static/jquery-wps-client/_imports/css/font-awesome/css/font-awesome.min.css" />

<script type="text/javascript" src="/static/jquery-wps-client/_imports/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="/static/jquery-wps-client/_imports/js/jquery.multiFieldExtender-2.0.min.js"></script>
<script type="text/javascript" src="/static/jquery-wps-client/_imports/js/jquery-ui-1.8.9.custom.min.js"></script>
<script type="text/javascript" src="/static/jquery-wps-client/_imports/js/can.custom.js"></script>
<script type="text/javascript" src="/static/jquery-wps-client/_imports/js/bootbox.min.js"></script>
<script type="text/javascript" src="/static/jquery-wps-client/_imports/js/prettify/prettify.js"></script>
<script type="text/javascript" src="/static/jquery-wps-client/_imports/js/jquery.namespace.js"></script>
<script type="text/javascript" src="/static/jquery-wps-client/_imports/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/static/jquery-wps-client/_imports/js/jquery.loadmask.js"></script>

<link type="text/css" rel="stylesheet" href="/static/jquery-wps-client/css/jquery.wps.client.css" />
<script type="text/javascript" src="/static/jquery-wps-client/js/jquery.wps.client.js"></script>
```

Also into the webportal.html (/static/webportal.html), an empty container was added:

```HTML
<body>
    ....
    <div id="myWpsDiv"></div>
    ....
</body>
```

When the page is loaded ($.ready), the plugin is called starting by the jquery selector. The following piece of code can be found into the file webportal.js (/static/webportal.js):

```Javascript
$(document).ready(function(){
	var wpsc = $("#myWpsDiv").wpsClient({
	  baseUrl: "http://<sandbox/cluster IP>:8080/wps/WebProcessingService" 
	});
});

**IMPORTANT 1:** To connect the WPS Client to your sandbox/cluster, the baseurl shall be http: <sandbox/cluster IP>:8080/wps/WebProcessingService and the user must insert the correct IP

**IMPORTANT 2:** The VPN connection shall always be opened

----------------------------------------------------------------------------------------------------------------------

<h3>FLASK CONCEPT</h3>

<h4>Flask</h4>

Flask is a Python web framework built with a small core and easy-to-extend philosophy.

Flask is used inside the python script (app.py) to have a simple app up and running.

The idea is to have an app running in the chosen host (e.g. 127.0.0.1) and port (e.g. 8080).

Then it is necessary to declare the app.route and assign the HTML file to it (webportal.html). Note that the name of the folder containing the HTML file shall always be "templates" or this won't work.

**EXAMPLE:**

```python
@app.route("/")
def index():
    return render_template("webportal.html") # HTML file of the Web Portal
```

As it was explained before, other functions (python functions) shall be described into the app.py. To do this, an URL can be added to the route and when this url is typed in the browser, the function will be called.

**EXAMPLE:**

```python
@app.route("/add_url", methods=['GET', 'POST']) # URL added to the route to launch function
def python_funtion():
    return other_function() # This function will be launched when it is typed in the browser http://127.0.0.1:8080/add_url
```

The previous examples are contained into the app.py file. Follow the code comments there to test the examples.

<h4>JSON</h4>

Flask also contains JSON that basically allows to pass values from the python functions to the JavaScript functions.

**EXAMPLE:**

```python
return render_json(json.dumps([function_outputs]))
```

To get the values from the JavaScript side, an AJAX request can be used inside the webportal.js (/static/webportal.js).

**EXAMPLE:**

```Javascript
function get_values_from_python() {
	$.ajax({
        	url: '/add_url'
        	, type: "POST"
        	, success: function(res) { // res is the returned output from python
			// Write here what to do with the outputs returned
	    	}
	});
}
```
Note that, to run this JS function and get the values from the python side, the function shall be associated to some element in the HTML (e.g. a button).

Again, the previous examples are contained into the app.py file and webportal.js file, respectively. Follow the code comments there to test the examples.

----------------------------------------------------------------------------------------------------------------------

<h3>RUN EXAMPLE</h3>

Finally, to launch the Flask app, the user shall follows the procedure described below.

```bash
$ cd webportal-demo-master
$ ./app.py
```

Then, on the browser type:
```bash
http://127.0.0.1:8080
```
The SenSyF Demonstrative Web Portal shall appear on the browser. Note that the WPS client will not show any usecase once the baseUrl shall be changed to your sandbox/cluster IP.

Test also to type:
```bash
http://127.0.0.1:8080/add_url
```
In this case, an "Hello World!!!" shall appear.

The last test test you can do is to uncomment the line that declares a button on the webportal.html file (/templates/webportal.html) and use the button to get an alert (defined on /static/webportal.js) with the "Hello World!!!" from the Python function (app.py). The idea of this last test is to show that is possible to get, on the JavaScript functions, values from the Python functions.

----------------------------------------------------------------------------------------------------------------------
