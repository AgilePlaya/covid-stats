var onLine = navigator.onLine;

window.onload = function () {
    //-- usage --//
    preload(
        "https://agileplaya.github.io/covid-stats/images/sad-cheem-cropped.png",
        "https://agileplaya.github.io/covid-stats/images/happy-cheem-cropped.png"
    )
}

var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

setInterval(check_state_change, 1000);

var requestURL = 'https://api.rootnet.in/covid19-in/stats/latest';

var grim_color = '#0e113f';
var cream_color = '#f7eace';
var green_color = '#e1f7ce';
var scream_color = '#f7cece';

var css_colors = document.querySelector(':root');

var ovr_state = 0;
var number_type = 0;

var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onerror = function() {
    elemNumber = document.getElementById('counter_number');
    elemLabel = document.getElementById('label');

    elemNumber.innerHTML = '<img src="https://agileplaya.github.io/covid-stats/images/sad-cheem-cropped.png"></img>'

    elemLabel.animate({opacity: [1, 0]}, 1000);
    elemLabel.innerText = 'Could not connect to Database'
    elemLabel.animate({opacity: [0, 1]}, 1000);
    console.log("Data Fetch Unsuccessful")
}

request.onprogress = function() {
    elemNumber = document.getElementById('counter_number');
    elemNumber.innerText = 'Fetching Data';
}

request.onload = function () {
    const jsonData = request.response;
    console.log(jsonData)
    console.log("Total Cases: " + jsonData['data']['summary']['total'])

    buttonClick();
}

function changeBgColor(newColor) {
    css_colors.style.setProperty('--color1', newColor)
}

function populateNumber(obj) {
    elemNumber = document.getElementById('counter_number');
    elemLabel = document.getElementById('label');

    if (number_type == 0) {
        elemNumber.animate({opacity: [1, 0]}, 1000);
        elemNumber.innerText = obj['data']['summary']['total'];
        elemNumber.animate({opacity: [0, 1]}, 1000);

        elemLabel.animate({opacity: [1, 0]}, 1000);
        elemLabel.innerText = 'Cumulative Confirmed Cases in India'
        elemLabel.animate({opacity: [0, 1]}, 1000);
    } else if (number_type == 1) {
        elemNumber.animate({opacity: [1, 0]}, 1000);
        elemNumber.innerText = obj['data']['summary']['discharged'];
        elemNumber.animate({opacity: [0, 1]}, 1000);

        elemLabel.animate({opacity: [1, 0]}, 1000);
        elemLabel.innerText = 'Cumulative Recovered Cases in India'
        elemLabel.animate({opacity: [0, 1]}, 1000);
    } else if (number_type == 2) {
        elemNumber.animate({opacity: [1, 0]}, 1000);
        elemNumber.innerText = obj['data']['summary']['deaths'];
        elemNumber.animate({opacity: [0, 1]}, 1000);

        elemLabel.animate({opacity: [1, 0]}, 1000);
        elemLabel.innerText = 'Cumulative Deaths in India'
        elemLabel.animate({opacity: [0, 1]}, 1000);
    }
}

function buttonClick() {
    if (ovr_state == 0) {
        populateNumber(request.response)
        changeBgColor(cream_color)
    }
    if (ovr_state == 1) {
        populateNumber(request.response)
        changeBgColor(green_color)
    }
    if (ovr_state == 2) {
        populateNumber(request.response)
        changeBgColor(scream_color)
    }
    ovr_state = (ovr_state + 1) % 3
    number_type = (number_type + 1) % 3
};

function check_state_change() {
    if (onLine!=navigator.onLine) {
        check_connectivity();
        onLine = navigator.onLine
    }
}

function check_connectivity() {
    if (navigator.onLine==false) {
        elemNumber = document.getElementById('counter_number');
        elemLabel = document.getElementById('label');
        elemButton = document.getElementById('change_data');
    
        elemNumber.innerHTML = '<img src="https://agileplaya.github.io/covid-stats/images/sad-cheem-cropped.png"></img>'
    
        elemLabel.animate({opacity: [1, 0]}, 1000);
        elemLabel.innerText = 'Lost Connection to Internet'
        elemLabel.animate({opacity: [0, 1]}, 1000);

        changeBgColor(scream_color)
        elemButton.disabled = true;

        console.log("Data Fetch Unsuccessful")
    }
    else {
        elemNumber = document.getElementById('counter_number');
        elemLabel = document.getElementById('label');
        elemButton = document.getElementById('change_data');
    
        elemNumber.innerHTML = '<img src="https://agileplaya.github.io/covid-stats/images/happy-cheem-cropped.png"></img>'
    
        elemLabel.animate({opacity: [1, 0]}, 1000);
        elemLabel.innerText = 'Connected. Press button below to check stats.'
        elemLabel.animate({opacity: [0, 1]}, 1000);

        changeBgColor(green_color)
        elemButton.disabled = false;

        console.log("Data Fetch Unsuccessful")
    }
}