$(document).ready(function(){
	var wpsc = $("#myWpsDiv").wpsClient({
	  baseUrl: "http://<sandbox/cluster IP>:8080/wps/WebProcessingService" /* To connect the WPS Client to your sandbox/cluster, the baseurl shall
										 be http://<sandbox/cluster IP>:8080/wps/WebProcessingService */
	});
});

function get_values_from_python() { /* To run this JS function and get the values from the python, the function shall be associated to some element in the HTML (e.g. a button)
				     To test this, uncomment on webportal.html the line <button onclick="get_values_from_python">Get 'Hello World' from Python</button> */
    $.ajax({
        url: '/add_url'
        , type: "POST"
        , success: function(res) { // res is the returned output from python
	    // Write here what to do with the outputs returned
	    alert(res);
        }
    });
}

// OTHER JAVASCRIPT FUNCTIONS SHALL BE PLACED HERE