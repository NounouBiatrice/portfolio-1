//This file obtains information about baby name meaning, popularity, and related celebrities

(function() {
    "use strict";

    window.onload = function() {
    listnames();
    var button = document.getElementById("search");
    button.onclick = listMeaning;
    };

    //"Helps" other functions to make Ajax requests based on the onload function and url
    function getAjax(next, url) {
        var ajax = new XMLHttpRequest();
        ajax.onload = next;
        ajax.open("GET", url, true);
        ajax.send();
    }

    //Access the list of first names
    function listnames() {
        getAjax(makelist, "babynames.php?type=list");
    }

    //Takes the list of first names and adds them to the select menu
    function makelist() {
        if (this.status == 200) {
            var list = document.getElementById("allnames");
            list.removeAttribute("disabled");
            var listofnames = this.responseText; 
            var arrayofnames = listofnames.split("\n");
            for (var i = 0; i < arrayofnames.length; i++) {
                var nextoption = document.createElement("option");
                nextoption.setAttribute("value", arrayofnames[i]);
                list.appendChild(nextoption);
                nextoption.innerHTML = arrayofnames[i];
            }
            document.getElementById("loadingnames").style.display = "none";
        } else {
            document.getElementById("errors").innerHTML = "Sorry there was an error of this type: " + this.status + " !";
            document.getElementById("loadingnames").style.display = "none";
            document.getElementById("resultsarea").style.display = "none";
            document.getElementById("loadinggraph").style.display = "none";
            document.getElementById("loadingmeaning").style.display = "none";
        }
    }

    //When the search button is clicked, changes some content of the page and access
    //the meaning of the selected baby name
    function listMeaning() {
        document.getElementById("resultsarea").style.display = "block";
        document.getElementById("graph").innerHTML = "";
        document.getElementById("loadinggraph").style.display = "inline";
        document.getElementById("meaning").innerHTML = "";
        document.getElementById("loadingmeaning").style.display = "inline";
        document.getElementById("norankdata").style.display = "none";
        document.getElementById("celebs").innerHTML = "";
        //document.getElementById("loadingcelebs").style.display = "inline";
        var name = document.getElementById("allnames").value;
        console.log(name);
        if (name != "") {
            getAjax(displayMeaning, "babynames.php?type=meaning&name=" + name);
        }
    }

    //Shows the meaning of the name on the page or displays an error message if the meaning wasn't 
    //accessed
    function displayMeaning() {
        if (this.status == 200) {
            var meaning = this.responseText; 
            document.getElementById("meaning").innerHTML = meaning;
            document.getElementById("loadingmeaning").style.display = "none";
            listPopularity();
        } else {
            document.getElementById("errors").innerHTML = "Sorry there was an error of this type: " + this.status + " !";
            document.getElementById("resultsarea").style.display = "none";
            document.getElementById("loadinggraph").style.display = "none";
            document.getElementById("loadingmeaning").style.display = "none";
        }
    }

    //Gets the name and gender information from the user then accesses the popularity rankings
    function listPopularity() {
        var name = document.getElementById("allnames").value;
        var male = document.getElementById("genderm");
            if (male.checked) {
                var gender = "m";
            }
        var female = document.getElementById("genderf");
            if (female.checked) {
                var gender = "f";
            }
        getAjax(displayPopularity, "babynames.php?type=rank&name=" + name + "&gender=" + gender);
    }

    //Shows the graph of popularity of the name over the years or displays an error if 
    //no ranking found
    function displayPopularity() {
        if (this.status == 200) {
            var rankings = this.responseXML.getElementsByTagName("rank"); 
            var years = document.createElement("tr");
            var bars = document.createElement("tr");
            document.getElementById("graph").appendChild(years);
            document.getElementById("graph").appendChild(bars);
            
            for (var i = 0; i < rankings.length; i++) { //traverses all rank elements
                var top = document.createElement("th");
                var year = rankings[i].getAttribute("year");// finds each year
                years.appendChild(top);
                top.innerHTML = year;
                var bar = document.createElement("td");
                var ranking = rankings[i].textContent; //finds the rank per year
                bars.appendChild(bar);
                var pink = document.createElement("div");
                bar.appendChild(pink);
                pink.innerHTML = ranking;
                if (ranking != 0){
                    pink.style.height = parseInt(0.25 * (1000 - ranking)) + "px";
                } else {
                    pink.style.height = "0px";
                }
            }
            document.getElementById("loadinggraph").style.display = "none";
            //listCelebs();
        } else {
            document.getElementById("norankdata").style.display = "inline";
            document.getElementById("loadinggraph").style.display = "none";
            //listCelebs();
      }
    }

    //accesses the list of celebrities with the same first name
    function listCelebs() {
        var name = document.getElementById("allnames").value;
        var male = document.getElementById("genderm");
        if (male.checked) {
            var gender = "m";
        }
        var female = document.getElementById("genderf");
        if (female.checked) {
            var gender = "f";
        }
        getAjax(displayCelebs, "babynames.php?type=celebs&name=" + name + "&gender=" + gender);
    }

    //Creates a bulletted list of celebrities with the same first name on the page
    function displayCelebs() {
        if (this.status == 200) {
            var json = JSON.parse(this.responseText); 
            for (var i = 0; i < json.actors.length; i++) {
                var li = document.createElement("li");
                li.innerHTML = json.actors[i].firstName + " " + json.actors[i].lastName + " (" + json.actors[i].filmCount + " films)";
                document.getElementById("celebs").appendChild(li);
            }
            document.getElementById("loadingcelebs").style.display = "none";
        } else {
            document.getElementById("errors").innerHTML = "Sorry there was an error of this type: " + this.status + " !";
            document.getElementById("loadinggraph").style.display = "none";
            document.getElementById("loadingmeaning").style.display = "none";
            document.getElementById("loadingcelebs").style.display = "none";
        }
    }
})();


