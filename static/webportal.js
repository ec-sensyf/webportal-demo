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

// CLOCK & COST

var nodes = 0;

function get_num_nodes() {
    $.ajax({
        url: '/nodes'
        , type: "POST"
        , success: function(res) {
	    nodes = res;
	}
    });
}

// Here set the minutes, seconds, and tenths-of-second when you want the chronometer to stop
// If all these values are set to 0, the chronometer not stop automatically
var sthours = 0;
var stmints = 0;
var stseconds = 0;
var stzecsec = 0;

// function to be executed when the chronometer stops
function toAutoStop() {
  alert('STOP');
}

// the initial tenths-of-second, seconds, and minutes
var zecsec = 0;
var seconds = 0;
var mints = 0;
var hours = 0;

var total_seconds = 0;
var vm_cost_per_second = 0.00000862;

var startchron = 0;

function chronometer() {
  if(startchron == 1) {
    zecsec += 1;       // set tenths of a second

    // set seconds
    if(zecsec > 9) {
      zecsec = 0;
      seconds += 1;
      total_seconds += 1;
    }

    // set minutes
    if(seconds > 59) {
      seconds = 0;
      mints += 1;
    }

    // set hours
    if(mints > 59) {
      mints = 0;
      hours += 1;
    }

    // adds data in #showtm
    if(seconds <= 9 && mints <= 9 && hours <= 9) {
      document.getElementById('showtm').innerHTML = '0' + hours + ':0' +mints+ ':0'+ seconds;
      document.getElementById('showcost').innerHTML = (vm_cost_per_second * nodes * total_seconds).toFixed(4) + '€';
    }else{
      if(seconds >= 9 && mints <= 9 && hours <= 9) {
      document.getElementById('showtm').innerHTML = '0' + hours + ':0' +mints+ ':'+ seconds;
      document.getElementById('showcost').innerHTML = (vm_cost_per_second * nodes * total_seconds).toFixed(4) + '€';
      }else{
	if(seconds <= 9 && mints >= 9 && hours <= 9) {
	document.getElementById('showtm').innerHTML = '0' + hours + ':' +mints+ ':0'+ seconds;
	document.getElementById('showcost').innerHTML = (vm_cost_per_second * nodes * total_seconds).toFixed(4) + '€';
	}else{
	  if(seconds <= 9 && mints <= 9 && hours >= 9) {
	  document.getElementById('showtm').innerHTML = hours + ':0' +mints+ ':0'+ seconds;
	  document.getElementById('showcost').innerHTML = (vm_cost_per_second * nodes * total_seconds).toFixed(4) + '€';
	  }else{
	    if(seconds >= 9 && mints >= 9 && hours <= 9) {
	    document.getElementById('showtm').innerHTML = '0' + hours + ':' +mints+ ':'+ seconds;
	    document.getElementById('showcost').innerHTML = (vm_cost_per_second * nodes * total_seconds).toFixed(4) + '€';
	    }else{
	      if(seconds <= 9 && mints >= 9 && hours >= 9) {
	      document.getElementById('showtm').innerHTML = hours + ':' +mints+ ':0'+ seconds;
	      document.getElementById('showcost').innerHTML = (vm_cost_per_second * nodes * total_seconds).toFixed(4) + '€';
	      }else{
		if(seconds >= 9 && mints <= 9 && hours >= 9) {
		document.getElementById('showtm').innerHTML = hours + ':0' +mints+ ':'+ seconds;
		document.getElementById('showcost').innerHTML = (vm_cost_per_second * nodes * total_seconds).toFixed(4) + '€';
		}else{
		  if(seconds >= 9 && mints >= 9 && hours >= 9) {
		  document.getElementById('showtm').innerHTML = hours + ':' +mints+ ':'+ seconds;
		  document.getElementById('showcost').innerHTML = (vm_cost_per_second * nodes * total_seconds).toFixed(4) + '€';
		  }
		}
	      }
	    }
	  }
	}
      }
    }
    // if the chronometer reaches to the values for stop, calls whenChrStop(), else, auto-calls chronometer()
    if(zecsec == stzecsec && seconds == stseconds && mints == stmints && hours == sthours && hours != 0) toAutoStop();
    else setTimeout("chronometer()", 100);
  }
}

function startChr() { startchron = 1; get_num_nodes(); chronometer(); }      // starts the chronometer
function stopChr() { startchron = 0; }                      // stops the chronometer
function resetChr() {
  zecsec = 0;  seconds = 0; mints = 0; hours = 0; total_seconds = 0; startchron = 0; 
  document.getElementById('showtm').innerHTML = '0' + hours + ':0' + mints+ ':0'+ seconds;
  document.getElementById('showcost').innerHTML = (vm_cost_per_second * nodes * total_seconds).toFixed(4) + '€';
}

// OTHER JAVASCRIPT FUNCTIONS SHALL BE PLACED HERE

