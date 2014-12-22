$(document)
		.ready(function() {

			listenerOnCategories()

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
			if (window.XMLHttpRequest) {// code for IE7+, Firefox,
				// Chrome,
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

	}	);

/**
 * 
 * 
 * 
 */

var deviatorUI = {}
deviatorUI.render = function(id, objData) {
	var key, baseString = document.getElementById(id).innerHTML;
	for (key in objData) {
		baseString = baseString.replace(new RegExp("<%=" + key + "=%>", "g"),
				objData[key]);

	}

	return baseString;
}


var loadGalleryItems = function(parentId, galleryData,catId) {
	var strHTML = "";
	for ( var i = 0; i < galleryData.length; i++) {
		galleryData[i]["imgId"] = catId+"_"+i;
		galleryData[i]["imgLabel"] ="Label : "+catId+"_"+i;
		strHTML = deviatorUI.render("galleryItemTemplate", galleryData[i]);
		$("#"+parentId).append(strHTML);
		
		document.getElementById(galleryData[i]["imgId"]).addEventListener("click", onImageClicked);
	}
	//document.getElementById(parentId).innerHTML = strHTML;

};

/*
 * cATEgories
 */

var listenerOnCategories = function() {
	var sHTML = "";
	for ( var i = 0; i < categoryArray.length; i++) {
		strHTML = deviatorUI.render("categoriesTemplate", categoryArray[i]);

		var domEle = document.createElement("div");
		domEle.setAttribute("id", categoryArray[i]["categoryDivName"]);
		document.getElementById("idGalleryItemsWrapper").appendChild(domEle);

		domEle.style.display = "none";

		$("#accordion").append(strHTML);

		loadGalleryItems(categoryArray[i]["categoryDivName"],
				categoryArray[i]["categorySource"],categoryArray[i]["categoryId"]);

		document.getElementById(categoryArray[i]["categoryDivName"]).style.display = "none";

		document.getElementById(categoryArray[i]["categoryId"])
				.addEventListener("click", onCategoryClicked);

	}

	// display 1
	document.getElementById(categoryArray[0]["categoryDivName"]).style.display = "block";

};

var onCategoryClicked = function(evt) {
	console.log(evt.target.parentElement.parentElement.parentElement);
	var str = evt.target.parentElement.parentElement.parentElement.id
	str = str.replace("cat", "");
	str = Number(str) - 1;
	for ( var i = 0; i < categoryArray.length; i++) {
		if (i === str)
			document.getElementById(categoryArray[i]["categoryDivName"]).style.display = "block";
		else
			document.getElementById(categoryArray[i]["categoryDivName"]).style.display = "none";
	}

	

};


var onImageClicked = function(evt)
{
	var str =evt.currentTarget.id;
	
	$("#mainModalDisplayed1 #myModalLabel").html($("#" +str+" .img-label").html());
	
	$("#mainModalDisplayed1 #myModelDescription").html($("#" +str+" .img-description").html());
	
	$("#mainModalDisplayed1 .modal-img-src").attr("src",$("#" +str+" img").attr("src"))
	$("#mainModalDisplayed1").modal('toggle');
}
