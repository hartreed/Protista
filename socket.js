function setupHttpRequest()
{
    //Prepare HTTP request
    if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
        var xmlhttp=new XMLHttpRequest();
    } else {
    // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    //When response is ready, process and output data
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	    var raw = xmlhttp.responseText.trim();
            postResponse(raw);
	    var sp = raw.split(",");
	    yaw = sp[0];
	    pitch = sp[1];
        }
    }
    return xmlhttp;
}
function sendHTTP() {
    if (game.simRunning) {
	var xmlhttp = setupHttpRequest(); //Setup a request to ask the arduino for data
	xmlhttp.open("GET","getData.php"); //GET request with our php file
	xmlhttp.send(); //Send request
    }
}
function postResponse(response){
    console.log(response);
}