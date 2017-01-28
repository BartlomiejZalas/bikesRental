function initMap() {
    infoWindow = new google.maps.InfoWindow;
    lineSymbol = {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW};
    trafficFlowLines = [];

    var map = new google.maps.Map(document.getElementById('trafficMap'), {
        zoom: 13,
        center: {lat: 51.107885, lng: 17.038538}
    });

    for (var i = 0; i < stations.length; i++) {
        var station = stations[i];
        var marker = createMarker(station, map, i);
        var stationTop5Flows = findTop5FlowsForStation(station.StationId);
        displayFlowsOnClick(marker, station, stationTop5Flows, map)
    }
}

function createMarker(station, map, i) {
    return new google.maps.Marker({
        position: {lat: station.Long, lng: station.Lat},
        map: map,
        title: stations[i].Name
    });
}

function displayFlowsOnClick(marker, station, top5Flows, map) {
    marker.addListener('click', function () {
        clearLines();
        infoWindow.close();
        for (var i = 0; i < top5Flows.length; i++) {
            var endStation = getStationData(top5Flows[i].EndStationId);
            trafficFlowLines[i] = createArrow(station, endStation);
            trafficFlowLines[i].setMap(map);
            addTrafficLinesInfoOnClick(trafficFlowLines[i], station, endStation, top5Flows[i], map);
        }
    });
}

function createArrow(station, endStation) {
    return new google.maps.Polyline({
        path: [{lat: station.Long, lng: station.Lat}, {lat: endStation.Long, lng: endStation.Lat}],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        icons: [{
            icon: lineSymbol,
            offset: '100%'
        }]
    });
}

function addTrafficLinesInfoOnClick(trafficFlowLine, station, endStation, trafficFlow, map) {
    google.maps.event.addListener(trafficFlowLine, 'click', function (event) {
        var content = '<b>From:</b> ' + station.Name + '<br><b>To:</b> ' + endStation.Name + '</br>' +
            '<b>Traffic:</b> ' + trafficFlow.TrafficFlow + ' ('+trafficFlow.NormalizedTrafficFlow+'%)';
        infoWindow.setContent(content);
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
        if (flow.StartStationId == stationId && flow.EndStationId != stationId) {
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

