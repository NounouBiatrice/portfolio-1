var number = 0;
var oldID = "";
window.onload = function() {
	showAbout();
	var hw  = document.getElementById("homework");
	hw.onmouseover = showoptions;
	hw.onmouseout = hideoptions;
	var about  = document.getElementById("about");
	about.onmouseover = showoptions;
	about.onmouseout = hideoptions;
	//about.onclick = showAbout;
	var blog  = document.getElementById("blog");
	blog.onmouseover = showoptions;
	blog.onmouseout = hideoptions;
	var contact  = document.getElementById("contact");
	contact.onmouseover = showoptions;
	contact.onmouseout = hideoptions;
}

function showportfolio() {
	var middle = document.getElementById("middle");
	document.getElementById("resume").style.display = "none";
	document.getElementById("start").style.display = "none";
	var newPortfolio = document.createElement("div");
	newPortfolio.innerHTML = document.getElementById("currentThumb").innerHTML;
	middle.appendChild(newPortfolio);
}

function showAbout() {
	var middle = document.getElementById("middle");
	document.getElementById("resume").style.display = "none";
	var aboutIntro = document.createElement("div");
	aboutIntro.setAttribute("class", "info");
	aboutIntro.setAttribute("id", "starting");
	aboutIntro.innerHTML = document.getElementById("start").innerHTML;
	middle.appendChild(aboutIntro);
}

function createintro() { //also create a timer so it changes every 30 seconds or so
	var number = parseInt(Math.random() * 10);
	if (number <= 2) {
		document.getElementById("1").style.display = "inline";
	} else if (number <= 4 ) {
		document.getElementById("2").style.display = "inline";
	} else if (number <=6) {
		document.getElementById("3").style.display = "inline";
	} else if (number <=8) {
		document.getElementById("4").style.display = "inline";
	} else {
		document.getElementById("5").style.display = "inline";
	}
}

function alerts() {
	alert("helloooooo!");
}

function showoptions() {
	document.getElementById("optionList" + this.getAttribute("id")).style.display = "inline";
	this.style.width = "40%";
	var holder = document.getElementById("holds" + this.id);
	holder.setAttribute("class", "holds");
	oldID = this.getAttribute("id");
	this.setAttribute("id", "hoveredOption"); //changes the id of the button in order to change the style
	if (oldID == "about") {
		var viewResume = document.getElementById("viewResume");
		viewResume.onclick = showresume;
		var downloadResume = document.getElementById("downloadResume");
		downloadResume.onclick = downloadresume;
	} else if (oldID == "contact") {
		var viewContact = document.getElementById("viewContact");
		viewContact.onclick = showcontact;
	}
}

function showcontact() {
	document.getElementById("resume").style.display = "none";
	document.getElementById("starting").style.display = "none";
	var contact = document.createElement("div");
	contact.setAttribute("class", "info");
	contact.setAttribute("id", "contactMe");
	contact.innerHTML = document.getElementById("contactInfo").innerHTML;
	document.getElementById("middle").appendChild(contact);
}

function hideoptions() {
	document.getElementById("optionList" + oldID).style.display = "none";
	this.setAttribute("id", oldID);
}

function showresume() {
	document.getElementById("middle").innerHTML = "";
	var resume = document.createElement("img");
	resume.src = "Resume.png";
	resume.alt = "Resume";
	resume.setAttribute("id", "resume");
	document.getElementById("middle").appendChild(resume);
}

function downloadresume() {
	var button = document.getElementById("getresume");
	button.style.display = "block";
}

function showPrograms() {
	document.getElementById("middle").innerHTML = "";
	var programBox = document.createElement("div");
	programBox.setAttribute("class", "info");
	programBox.innerHTML = document.getElementById("programInfo").innerHTML;
	var middle = document.getElementById("middle");
	middle.appendChild(programBox);
	document.getElementById("here").onclick = showCode;
}

function showCode() {
	document.getElementById("middle").innerHTML = "";
	var codeBox = document.createElement("div");
	codeBox.setAttribute("class", "info");
	codeBox.innerHTML = document.getElementById("codeInfo").innerHTML;
	var middle = document.getElementById("middle");
	middle.appendChild(codeBox);
	document.getElementById("this").onclick = showPrograms;
}
