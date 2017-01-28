var trafficFlowLines = [];

function initMap() {
    infoWindow = new google.maps.InfoWindow;
    var wroclaw = {lat: 51.107885, lng: 17.038538};
    var map = new google.maps.Map(document.getElementById('trafficMap'), {
        zoom: 13,
        center: wroclaw
    });

    for (var i = 0; i < stations.length; i++) {
        var station = stations[i];
        var marker = new google.maps.Marker({
            position: {lat: station.Long, lng: station.Lat},
            map: map,
            title: stations[i].Name
        });

        displayFlowsOnClick(marker, station, findTop5FlowsForStation(station.StationId), map)
    }

}

function displayFlowsOnClick(marker, station, top5Flows, map) {
    marker.addListener('click', function () {
        clearLines();
        for (var i = 0; i < top5Flows.length; i++) {
            var endStation = getStationData(top5Flows[i].EndStationId);
            trafficFlowLines[i] = new google.maps.Polyline({
                path: [{lat: station.Long, lng: station.Lat}, {lat: endStation.Long, lng: endStation.Lat}],
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
            trafficFlowLines[i].setMap(map);

            addTrafficLinesHover(trafficFlowLines[i], station, endStation, top5Flows[i], map);
        }
    });
}

function addTrafficLinesHover(trafficFlowLine, station, endStation, trafficFlow, map) {
    google.maps.event.addListener(trafficFlowLine, 'click', function (event) {
        infoWindow.setContent('<b>'+station.Name + ' > ' + endStation.Name + '</b><br>Traffic: ' + trafficFlow.TrafficFlow);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
    });
}

function clearLines() {
    for (var i = 0; i < 5; i++) {
        if (trafficFlowLines[i] != undefined) {
            trafficFlowLines[i].setMap(null);
        }
    }
}

function getStationData(stationId) {
    for (var i = 0; i < stations.length; i++) {
        if (stations[i].StationId == stationId) {
            return stations[i];
        }
    }
}

function findTop5FlowsForStation(stationId) {
    var flowsFromStations = findFlowFromStation(stationId);
    flowsFromStations.sort(compare);
    return flowsFromStations.slice(0, 5);
}

function findFlowFromStation(stationId) {
    var flows = [];
    for (i = 0; i < trafficFlow.length; i++) {
        var flow = trafficFlow[i];
        if (flow.StartStationId == stationId) {
            flows.push(flow)
        }
    }
    return flows;
}

function compare(a, b) {
    if (a.TrafficFlow < b.TrafficFlow)
        return 1;
    if (a.TrafficFlow > b.TrafficFlow)
        return -1;
    return 0;
}

