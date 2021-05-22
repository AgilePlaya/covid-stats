var requestURL = 'https://api.rootnet.in/covid19-in/stats/latest';

var grim_color = '#0e113f'
var cream_color = '#f7eace'
var green_color = '#e1f7ce'
var scream_color = '#f7cece'

var ovr_state = 0
var number_type = 0

var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
    const jsonData = request.response;
    console.log(jsonData)
    console.log("Total Cases: " + jsonData['data']['summary']['total'])

    populateNumber(jsonData);
}

function changeBgColor(newColor) {
    const body = document.getElementById('body');
    body.style.backgroundColor = newColor
}

function populateNumber(obj) {
    elemNumber = document.getElementById('counter_number');
    elemLabel = document.getElementById('label');

    if (number_type == 0) {
        elemNumber.animate({
            opacity: [1, 0]
        }, 1000);
        elemNumber.innerText = obj['data']['summary']['total'];
        elemNumber.animate({
            opacity: [0, 1]
        }, 1000);

        elemLabel.animate({
            opacity: [1, 0]
        }, 1000);
        elemLabel.innerText = 'Cumulative Confirmed Cases in India'
        elemLabel.animate({
            opacity: [0, 1]
        }, 1000);
    } else if (number_type == 1) {
        elemNumber.animate({
            opacity: [1, 0]
        }, 1000);
        elemNumber.innerText = obj['data']['summary']['discharged'];
        elemNumber.animate({
            opacity: [0, 1]
        }, 1000);

        elemLabel.animate({
            opacity: [1, 0]
        }, 1000);
        elemLabel.innerText = 'Cumulative Recovered Cases in India'
        elemLabel.animate({
            opacity: [0, 1]
        }, 1000);
    } else if (number_type == 2) {
        elemNumber.animate({
            opacity: [1, 0]
        }, 1000);
        elemNumber.innerText = obj['data']['summary']['deaths'];
        elemNumber.animate({
            opacity: [0, 1]
        }, 1000);

        elemLabel.animate({
            opacity: [1, 0]
        }, 1000);
        elemLabel.innerText = 'Cumulative Deaths in India'
        elemLabel.animate({
            opacity: [0, 1]
        }, 1000);
    }
    number_type = (number_type + 1) % 3
}

function buttonClick() {
    if (ovr_state == 0) {
        populateNumber(request.response)
        changeBgColor(green_color)
    }
    if (ovr_state == 1) {
        populateNumber(request.response)
        changeBgColor(scream_color)
    }
    if (ovr_state == 2) {
        populateNumber(request.response)
        changeBgColor(cream_color)
    }
    ovr_state = (ovr_state + 1) % 3
};