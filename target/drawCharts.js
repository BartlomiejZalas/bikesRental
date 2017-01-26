var chartjsData = [];
var chartjsLabels = [];
var userRentalsData = [];
var userRentalsHours = [];
var stationRentalsLabels = [];
var stationRentalsData = [];
var stationRentalsHours = [];
var rentalsHoursInDaysData = [];
var rentalsHoursInDaysLabels = [];


/* Il. wypo�ycze� od stacji */

for (var i = 0; i < stationsRentalsData.length; i++) {
    chartjsData.push(stationsRentalsData[i].Count);
}
for (var i = 0; i < stationsRentalsData.length; i++) {
    chartjsLabels.push(stationsRentalsData[i].Name);
}

/* Il. wypo�ycze� u�ytkownik�w/godziny */

for (var i = 0; i < userRentals.length; i++) {
    userRentalsHours.push(userRentals[i].StartHour);
}

for (var i = 0; i < userRentals.length; i++) {
    userRentalsData.push(userRentals[i].Rentals);
}
for (var i = 0; i < rentalsStationsTotal.length; i++) {
    stationRentalsLabels.push(rentalsStationsUnique[i].Name);
}

/* Il. wypo�ycze� u�ytkownik�w w stacji/godziny */

for (var i = 0; i < rentalsStationsUnique.length; i++) {
    stationRentalsData.push(rentalsStationsUnique[i].Rentals);
}
for (var i = 0; i < rentalsStationsUnique.length; i++) {
    stationRentalsHours.push(rentalsStationsUnique[i].StartHour);
}

/* Il. wypo�ycze� od dni, miesi�cy */

var date = [];
var hours = [];
var days = [];
var dayNumbers = [];
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var months = [];
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

for (var i = 0; i < rentalsHoursInDays.length; i++) {
    rentalsHoursInDaysData.push(rentalsHoursInDays[i].Rentals);
}

for (var i = 0; i < rentalsHoursInDays.length; i++) {
    rentalsHoursInDaysLabels.push(rentalsHoursInDays[i].Date);
    date.push(new Date(rentalsHoursInDaysLabels[i]));
    hours.push(date[i].getHours());
    days.push(dayNames[date[i].getDay()]);
    dayNumbers.push(date[i].getDate());
    months.push(monthNames[date[i].getMonth()]);
}

var uniqueDays = [];
$.each(dayNumbers, function (i, el) {
    if ($.inArray(el, uniqueDays) === -1) uniqueDays.push(el);
});

uniqueDays.sort(sortNumber);

function sortNumber(a, b) {
    return a - b;
}

var ctx = document.getElementById("canvas").getContext("2d");

var canvas = new Chart(ctx, {
    type: 'line',
    data: {
        labels: chartjsLabels,
        datasets: [
            {
                label: 'Wypożyczenia',
                fillColor: "rgba(220,280,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                backgroundColor: "rgba(153,255,51,0.4)",
                data: chartjsData

            }]
    }
});

var ctx2 = document.getElementById("canvas2").getContext("2d");

var canvas2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: userRentalsHours,
        datasets: [
            {
                label: 'Wypożyczenia',
                fillColor: "rgba(220,280,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                backgroundColor: "rgba(153,255,51,0.4)",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: userRentalsData
            }]
    }
});

var ctx3 = document.getElementById("canvas3").getContext("2d");

var canvas3 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: chartjsLabels,
        datasets: [
            {
                label: 'Wypożyczenia',
                fillColor: "rgba(20,80,220,0.5)",
                strokeColor: "rgba(20,80,220,1)",
                backgroundColor: "rgba(53,25,51,0.4)",
                data: []
            }]
    }
});

var ctx4 = document.getElementById("canvas4").getContext("2d");

var canvas4 = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: uniqueDays,
        datasets: [
            {
                label: 'Wypożyczenia',
                fillColor: "rgba(280,80,220,0.5)",
                strokeColor: "rgba(280,80,220,1)",
                backgroundColor: "rgba(53,255,251,0.4)",
                data: []
            }]
    }
});

var ctx5 = document.getElementById("canvas5").getContext("2d");

var canvas5 = new Chart(ctx5, {
    type: 'line',
    data: {
        labels: userRentalsHours,
        datasets: [
            {
                label: 'Wypożyczenia',
                fillColor: "rgba(120,180,120,0.5)",
                strokeColor: "rgba(120,120,120,1)",
                backgroundColor: "rgba(253,155,151,0.4)",
                data: []
            }]
    }
});

/* Select Hour */
var select = document.getElementById("selectNumber");
var options = userRentalsHours;

for (var i = 0; i < userRentalsHours.length; i++) {
    var opt = userRentalsHours[i];
    var el = document.createElement("option");
    el.text = opt;
    el.value = opt;
    select.add(el);
}

select.addEventListener('change', function () {
    updateChart()
});

function updateChart() {

    canvas3.destroy();
    var stationRentalsHoursTemp = [];
    var stationRentalName = [];

    var determineHour = selectNumber.options[selectNumber.selectedIndex].innerHTML;

    for (var i = 0; i < stationRentalsHours.length; i++) {
        if (determineHour == stationRentalsHours[i]) {
            stationRentalsHoursTemp.push(stationRentalsData[i])
            stationRentalName.push(stationRentalsLabels[i]);
        }
    }

    canvas3 = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: stationRentalName,
            datasets: [
                {
                    label: 'Wypożyczenia',
                    fillColor: "rgba(20,80,220,0.5)",
                    strokeColor: "rgba(20,80,220,1)",
                    backgroundColor: "rgba(53,25,51,0.4)",
                    data: stationRentalsHoursTemp
                }]
        }
    });
}

/* Select Month */

var select2 = document.getElementById("selectMonth");
var options2 = months;
var uniqueDates = [];
$.each(months, function (i, el) {
    if ($.inArray(el, uniqueDates) === -1) uniqueDates.push(el);
});

for (var i = 0; i < uniqueDates.length; i++) {
    var opt2 = uniqueDates[i];
    var el2 = document.createElement("option");
    el2.text = opt2;
    el2.value = opt2;
    select2.add(el2);
}

/*var select21 = document.getElementById("selectDay");
 var options21 = days;


 for(var i = 0; i < uniqueDays.length; i++) {
 var opt21 = uniqueDays[i];
 var el21 = document.createElement("option");
 el21.text = opt21;
 el21.value = opt21;
 select21.add(el21);
 }

 select21.addEventListener('change', function() {updateChart2() });*/

select2.addEventListener('change', function () {
    updateChart2()
});

function updateChart2() {

    canvas4.destroy();
    var stationRentalsCountTemp = [];
    var stationRentalDaysTemp = [];

    var determineMonth = selectMonth.options[selectMonth.selectedIndex].innerHTML;
    /*var determineDays = selectDay.options[selectDay.selectedIndex].innerHTML;*/

    for (var i = 0; i < months.length; i++) {
        if (determineMonth == months[i]) {
            stationRentalsCountTemp.push(rentalsHoursInDaysData[i]);
            stationRentalDaysTemp.push(dayNumbers[i]);
        }
    }


    var t = 0;
    for (var i = 0; i < stationRentalDaysTemp.length + 1; i++) {
        for (var k = i + 1; k < stationRentalDaysTemp.length + 1; k++) {
            if (stationRentalDaysTemp[i] == stationRentalDaysTemp[k]) {
                stationRentalsCountTemp[i] = stationRentalsCountTemp[i] + stationRentalsCountTemp[k];
                t++;
            }
            else {
                stationRentalDaysTemp.splice(i + 1, t);
                k = k - t;
                i = k - 1;
                t = 0;
                break;
            }
        }
    }

    canvas4 = new Chart(ctx4, {
        type: 'line',
        data: {
            labels: stationRentalDaysTemp,
            datasets: [
                {
                    label: 'Wypożyczenia',
                    fillColor: "rgba(280,80,220,0.5)",
                    strokeColor: "rgba(280,80,220,1)",
                    backgroundColor: "rgba(53,255,251,0.4)",
                    data: stationRentalsCountTemp
                }]
        }
    });
}

/* Select station */
var select3 = document.getElementById("selectStation");
var options3 = chartjsLabels;

for (var i = 0; i < chartjsLabels.length; i++) {
    var opt3 = chartjsLabels[i];
    var el3 = document.createElement("option");
    el3.text = opt3;
    el3.value = opt3;
    select3.add(el3);
}

select3.addEventListener('change', function () {
    updateChart3()
});


function updateChart3() {
    canvas5.destroy();
    var stationRentalsCountTemp = [];
    var stationRentalsHoursTemp = [];

    var determineName = selectStation.options[selectStation.selectedIndex].innerHTML;

    for (var i = 0; i < stationRentalsHours.length; i++) {
        if (determineName == stationRentalsLabels[i]) {
            stationRentalsHoursTemp.push(stationRentalsHours[i])
            stationRentalsCountTemp.push(stationRentalsData[i]);
        }
    }

    canvas5 = new Chart(ctx5, {
        type: 'line',
        data: {
            labels: stationRentalsHoursTemp,
            datasets: [
                {
                    label: 'Wypożyczenia',
                    fillColor: "rgba(120,180,120,0.5)",
                    strokeColor: "rgba(120,120,120,1)",
                    backgroundColor: "rgba(253,155,151,0.4)",
                    data: stationRentalsCountTemp
                }]
        }
    });
}

Array.prototype.diff = function (arr2) {
    var ret = [];
    this.sort();
    arr2.sort();
    for (var i = 0; i < this.length; i += 1) {
        if (arr2.indexOf(this[i]) > -1) {
            ret.push(this[i]);
        }
    }
    return ret;
};
