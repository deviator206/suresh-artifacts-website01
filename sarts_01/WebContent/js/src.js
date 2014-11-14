$(document)
	.ready(function() {

	    function manipulateUI(bCheck) {
		if (bCheck) {

		    // send data
		document.getElementById("idSubmitEnquiry").innerHTML = "Submiting..";

		document.getElementById("idName")
			.setAttribute("disabled", true)
		document.getElementById("idAddress").setAttribute("disabled",
			true)
		document.getElementById("idEmail").setAttribute("disabled",
			true)
		document.getElementById("idPhone").setAttribute("disabled",
			true)
		document.getElementById("idMessage").setAttribute("disabled",
			true)

	    } else {

		// send data
		document.getElementById("idSubmitEnquiry").innerHTML = "Submit";

		document.getElementById("idName").removeAttribute("disabled");
		document.getElementById("idAddress")
			.removeAttribute("disabled");
		document.getElementById("idEmail").removeAttribute("disabled");
		document.getElementById("idPhone").removeAttribute("disabled");
		document.getElementById("idMessage")
			.removeAttribute("disabled");

		document.getElementById("idName").value = "";
		document.getElementById("idAddress").value = "";
		document.getElementById("idEmail").value = "";
		document.getElementById("idPhone").value = "";
		document.getElementById("idMessage").value = "";
		
		document.getElementById("idName").style.border = "none";
		document.getElementById("idEmail").style.border = "none";
		
	    }

	}
	;
	// send data
	function sendData(url, methd, obj) {
	    var xmlhttp;
	    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome,
		// Opera, Safari
		xmlhttp = new XMLHttpRequest();
	    } else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		    manipulateUI(false);
		    // document.getElementById("myDiv").innerHTML =
		    // xmlhttp.responseText;
		} else if (xmlhttp.status == 500 || xmlhttp.status == 404
			|| xmlhttp.status == 302) {
		    manipulateUI(false);
		}

	    }
	    xmlhttp.open(methd, url, true);
	    xmlhttp.send(JSON.stringify(obj));

	}

	var clickHandler = function() {
	    alert(" clicked");

	    var objForServer = {};

	    objForServer["name"] = document.getElementById("idName").value;
	    objForServer["address"] = document.getElementById("idAddress").value;
	    objForServer["email"] = document.getElementById("idEmail").value;
	    objForServer["phone"] = document.getElementById("idPhone").value;
	    objForServer["message"] = document.getElementById("idMessage").value;

	    // name
	    if (objForServer["name"] == "" || objForServer["name"] == undefined) {
		document.getElementById("idName").style.border = "3px red solid";
		return false;
	    }

	    // email
	    if (objForServer["email"] == ""
		    || objForServer["email"] == undefined) {
		document.getElementById("idEmail").style.border = "3px red solid";
		return false;
	    }
	    document.getElementById("idMessage").style.border = "none";
	    document.getElementById("idPhone").style.border = "none";
		
		
		
	    manipulateUI(true);
	    sendData("LayerInterface", "POST", objForServer);

	};

	// event listener
	document
		.getElementById("idSubmitEnquiry")
		.addEventListener(
			"click",
			function() {
			    var sContent = document
				    .getElementById("idSubmitEnquiry").innerHTML;
			    if (sContent !== "Submiting..")
				clickHandler();

			});

    }   );