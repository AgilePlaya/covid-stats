// // function to handle success
// function success() {
//     var data = JSON.parse(this.responseText); //parse the string to JSON
//     console.log(data);
//     console.log(data.summary.total)
// }

// // function to handle error
// function error(err) {
//     console.log('Request Failed', err); //error details will be in the "err" object
// }

// var xhr = new XMLHttpRequest(); //invoke a new instance of the XMLHttpRequest
// xhr.onload = success; // call success function if request is successful
// xhr.onerror = error;  // call error function if request failed
// xhr.open('GET', 'https://api.rootnet.in/covid19-in/stats/latest'); // open a GET request
// xhr.send(); // send the request to the server.

let requestURL = 'https://api.rootnet.in/covid19-in/stats/latest';

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    const jsonData = request.response;
    console.log(jsonData)
    console.log("Total Cases: " + jsonData['data']['summary']['total'])

    populateNumber(jsonData);
}

function populateNumber(obj) {
    const dataNumber = document.createElement('p');
    elem = document.getElementById('counter');
    dataNumber.textContent = obj['data']['summary']['total'];
    counter.appendChild(dataNumber);
}

