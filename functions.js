let lonlat = 0;
let numberOfRoutes = 3;
let routeCounter = 0;
let map;
// Operands
let layersPoints = [];
let layersPositions = [];
let layersLines = [];

// Route 1
let Route_1 = {
    layersPoints : [],
    layersPositions : [],
    layersLines : []
};
// Route 2
let Route_2 = {
    layersPoints : [],
    layersPositions : [],
    layersLines : []
};
// Route 3 
let Route_3 = {
    layersPoints : [],
    layersPositions : [],
    layersLines : []
};

let weatherForecastTime = '0h';
let points = [];
let inputPoints = [];
let dialogVisible = false;
let dialog;
let sealayer;
let marineTrafficLayer;
let layerSeamarks;
let layerWeatherWind0h;
let layerWeatherWind6h;
let layerWeatherWind12h;
let layerWeatherWind24h;
let layerWeatherPressure0h;
let layerWeatherPressure6h;
let layerWeatherPressure12h;
let layerWeatherPressure24h;
let layerWeatherTemperature0h;
let layerWeatherTemperature6h;
let layerWeatherTemperature12h;
let layerWeatherTemperature24h;
let layerWeatherPrecipation0h;
let layerWeatherPrecipation6h;
let layerWeatherPrecipation12h;
let layerWeatherPrecipation24h;
let weatherWindLayers;
let weatherPressureLayers;
let weatherTemperatureLayers;
let weatherPrecipationLayers;
let weatherLayers;
var weatherTileUrl = "https://weather.openportguide.de/tiles/actual/";
console.log("Using JavaScript version:", navigator.userAgent);
const projExtent = ol.proj.get('EPSG:3857').getExtent();
const startResolution = ol.extent.getWidth(projExtent) / 256;
const resolutions = new Array(22);
for (let i = 0; i < resolutions.length; ++i) {
        resolutions[i] = startResolution / Math.pow(2, i);
}
const tileGrid512 = new ol.tilegrid.TileGrid({
    extent: projExtent,
    resolutions: resolutions,
    tileSize: [512, 512],
});


function element(id) {
    return document.getElementById(id);
}

function createLayers(){

    const sealayerKey = 'JsaEDLgBR6Xt7bNTWJcd';

    sealayer = new ol.layer.VectorTile({
        opacity: 0.9,
        source: new ol.source.VectorTile({
            url:
            'https://api.maptiler.com/tiles/land/{z}/{x}/{y}.pbf?key=' + sealayerKey,
            tileSize: 512,
            maxZoom: 14,
            format: new ol.format.MVT(),
        }),
    });

    marineTrafficLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://tiles.marinetraffic.com/ais_helpers/shiptilesingle.aspx?output=png&sat=1&grouping=shiptype&tile_size=512&legends=1&zoom={z}&X={x}&Y={y}',
            tileGrid: tileGrid512
        }),
        visible: false
    });

    layerSeamarks = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://t1.openseamap.org/seamark/{z}/{x}/{y}.png',
            }),
        visible: false
    });

    layerWeatherWind0h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/wind_stream/0h/{z}/{x}/{y}.png'
            }),
        visible: false,
        opacity: 1
    });

    layerWeatherWind6h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/wind_stream/6h/{z}/{x}/{y}.png'
            }),
        visible: false,
        opacity: 1
    });

    layerWeatherWind12h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/wind_stream/12h/{z}/{x}/{y}.png'
            }),
        visible: false,
        opacity: 1
    });

    layerWeatherWind24h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/wind_stream/24h/{z}/{x}/{y}.png'
            }),
        visible: false,
        opacity: 1
    });

    layerWeatherPressure0h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/surface_pressure/0h/{z}/{x}/{y}.png'
            }),
        visible: false 
    });

    layerWeatherPressure6h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/surface_pressure/6h/{z}/{x}/{y}.png'
            }),
        visible: false 
    });

    layerWeatherPressure12h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/surface_pressure/12h/{z}/{x}/{y}.png'
            }),
        visible: false 
    });

    layerWeatherPressure24h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/surface_pressure/24h/{z}/{x}/{y}.png'
            }),
        visible: false 
    });

    layerWeatherTemperature0h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/air_temperature/0h/{z}/{x}/{y}.png'
            }),
        visible: false 
    });

    layerWeatherTemperature6h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/air_temperature/6h/{z}/{x}/{y}.png'
            }),
        visible: false 
    });

    layerWeatherTemperature12h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/air_temperature/12h/{z}/{x}/{y}.png'
            }),
        visible: false 
    });

    layerWeatherTemperature24h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/air_temperature/24h/{z}/{x}/{y}.png'
            }),
        visible: false 
    });

    layerWeatherPrecipation0h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/precipitation/0h/{z}/{x}/{y}.png'
            }),
        visible: false 
    });

    layerWeatherPrecipation6h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/precipitation/6h/{z}/{x}/{y}.png'
            }),
        visible: false 
    });

    layerWeatherPrecipation12h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/precipitation/12h/{z}/{x}/{y}.png'
            }),
        visible: false 
    });

    layerWeatherPrecipation24h = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: weatherTileUrl +'/precipitation/24h/{z}/{x}/{y}.png'
            }),
        visible: false 
    });

    weatherWindLayers = {
        "0h" : layerWeatherWind0h,
        "6h" : layerWeatherWind6h,
        "12h" : layerWeatherWind12h,
        "24h" : layerWeatherWind24h
    };

    weatherPressureLayers = {
        "0h" : layerWeatherPressure0h,
        "6h" : layerWeatherPressure6h,
        "12h" : layerWeatherPressure12h,
        "24h" : layerWeatherPressure24h
    };

    weatherTemperatureLayers = {
        "0h" : layerWeatherTemperature0h,
        "6h" : layerWeatherTemperature6h,
        "12h" : layerWeatherTemperature12h,
        "24h" : layerWeatherTemperature24h
    };

    weatherPrecipationLayers = {
        "0h" : layerWeatherPrecipation0h,
        "6h" : layerWeatherPrecipation6h,
        "12h" : layerWeatherPrecipation12h,
        "24h" : layerWeatherPrecipation24h
    };

    weatherLayers = [weatherWindLayers, weatherPressureLayers, weatherTemperatureLayers, weatherPrecipationLayers];
}

function showMapKey() {
    document.getElementById("dialog-box").style.display = "block";
}

function hideDialogBox() {
    document.getElementById("dialog-box").style.display = "none";
}

function loadImage(imgPath) {
    document.getElementById("dialog-img").src = imgPath;
}

// function calculate_route(geolocation, map, sealayer){
//     currentPosition = geolocation.getPosition();
//     // currentPosition = [19.240795054589547, 54.44377441445792];
//     if (!currentPosition) {
//         console.log("Cannot get current position");
//     }
//     else {
//         currentPosition = ol.proj.transform(currentPosition, 'EPSG:3857', 'EPSG:4326');
//         // MUST BE 2 POINTS
//         if (lonlat==0){
//             console.log("Please mark your destination")
//         }
//         else{
//             calc(currentPosition, map)
//         }
//     }
// }

// function calc(currentPosition, map){
//     var arr = [];
//     current_lon = currentPosition[0];
//     current_lat = currentPosition[1];
//     finish_lon = lonlat[0]
//     finish_lat = lonlat[1]
//     console.log(finish_lon)
//     console.log(finish_lat)
//     step = 10
//     var step_lon = (current_lon - finish_lon) / step;
//     var step_lat = (current_lat - finish_lat) / step;
//     // OM EPSG 3857
//     currentPosition = ol.proj.transform(currentPosition, 'EPSG:4326', 'EPSG:3857');
//     for (var i = 0; i <= step; i++) {
//         var help_arr = []
//         lon = current_lon - step_lon * i
//         for (var j = 0; j <= step; j++) {
//             lat = current_lat - step_lat * j
//             help_arr[j] = checkIfWater(lon, lat)
//         }
//         // console.log(help_arr)
//         arr.splice(i, 0, help_arr)
//     }
//     console.log(arr);
// }

function checkIfWater(lon,lat){
    let currentPosition = ol.proj.transform([lon,lat], 'EPSG:4326', 'EPSG:3857');
    var feature = map.getFeaturesAtPixel(map.getPixelFromCoordinate(currentPosition));
        if (!(feature.length && !feature[0].geometryName_)){
            return true;
        }
        return false;
}


function clickOnMap(content, overlay){
    map.on('singleclick', function (event) {
        var features = map.getFeaturesAtPixel(event.pixel);
        if (features.length && !features[0].geometryName_){
            window.alert("You cannot click on land!");
        }
        else{
            // Stare podejście z użyciem API
            // const request = new Request('https://api.onwater.io/api/v1/results/'+lonlat[1]+','+lonlat[0]+'?access_token=M6t-gLjKFaE4-wG7JHzT')
            // water = Req(request, layersPoints, lonlat, content, map);
            var coordinate = event.coordinate;
            lonlat = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');

            overlay.setPosition(coordinate);
            if (features.length){
                console.warn("CLICKED ON POINT");
                content.innerHTML = formatLonLatMessage(features[features.length-1].values_.lonlat);
                overlay.setPosition(coordinate);
            }
            else{
                if(!element('Mark_points').checked){
                    RemoveAllPoints();
                }
                MarkPositions(lonlat, content, map, layersPositions);
            }
            
        }
    });
}
function moveOnMap(){
    map.on('pointermove', function (event) {
        lonlat = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        element("coordinate-text").textContent = formatLonLatMessage(lonlat);
        
    });
}
function wheelOnMap(){
    map.getViewport().addEventListener('wheel', async function() {
        await new Promise(resolve => setTimeout(resolve, 500));
        element("zoom-text").textContent = 'Zoom = ' + map.getView().getZoom();
    });
    map.on('dblclick', async function() {
        await new Promise(resolve => setTimeout(resolve, 500));
        element("zoom-text").textContent = 'Zoom = ' + map.getView().getZoom();
    });
}
function countNewRoute(){
    routeCounter = (routeCounter + 1) % numberOfRoutes;
}

function midPointFormula(startLonRad, startLatRad, endLonRad, endLatRad) {
    var deltaLon = endLonRad - startLonRad;
    var Bx = Math.cos(endLatRad) * Math.cos(deltaLon);
    var By = Math.cos(endLatRad) * Math.sin(deltaLon);
    var midLatRad = Math.atan2(
      Math.sin(startLatRad) + Math.sin(endLatRad),
      Math.sqrt((Math.cos(startLatRad) + Bx) * (Math.cos(startLatRad) + Bx) + By * By)
    );
    var midLonRad = startLonRad + Math.atan2(By, Math.cos(startLatRad) + Bx);
    return [midLonRad, midLatRad];
}

function midpointsInterator(iterCounter, startLonRad, startLatRad, endLonRad, endLatRad){
    iterCounter +=1;
    var var1,var2,var3,var4;
    var midLonRad,midLatRad;
    [midLonRad, midLatRad] = midPointFormula(startLonRad, startLatRad, endLonRad, endLatRad);
    if (iterCounter < 6){
        [var1, var2] = midpointsInterator(iterCounter, startLonRad, startLatRad, midLonRad, midLatRad);
        [var3, var4] = midpointsInterator(iterCounter, midLonRad, midLatRad, endLonRad, endLatRad);
        points.push({ lon: toDegrees(var1), lat: toDegrees(var2) });
        points.push({ lon: toDegrees(var3), lat: toDegrees(var4) });
    }
    return [midLonRad, midLatRad];
}

function calculateGreatCircleRoute(startLon, startLat, endLon, endLat, style) {
    var startLonRad = toRadians(startLon);
    var startLatRad = toRadians(startLat);
    var endLonRad = toRadians(endLon);
    var endLatRad = toRadians(endLat);
    points.push({ lon: toDegrees(startLonRad), lat: toDegrees(startLatRad) });
    midpointsInterator(0, startLonRad, startLatRad, endLonRad, endLatRad);
    points.push({ lon: toDegrees(endLonRad), lat: toDegrees(endLatRad) });
    points.sort((a, b) => a.lon - b.lon);
    for (let i = 1; i < points.length; i++) {
        var line = new ol.geom.LineString([ol.proj.fromLonLat([points[i-1].lon, points[i-1].lat]),ol.proj.fromLonLat([points[i].lon, points[i].lat])]);
        var lineFeature = new ol.Feature({
            geometry: line
          });
        var layer_line = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [lineFeature]
            })
        });
        layer_line.setStyle(style);
        layersLines.push(layer_line);
        map.addLayer(layer_line);
    }
    points = [];
}

function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
}
  
function toDegrees(radians) {
    return (radians * 180) / Math.PI;
}

function MarkPositions(lonlat, content, map, layersPositions){
    var layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([lonlat[0], lonlat[1]])),
                    lonlat: lonlat
                })
            ]
        })
    });
    layer.lonlat = lonlat;
    content.innerHTML = formatLonLatMessage(lonlat);
    layersPositions.push(lonlat);
    layersPoints.push(layer);
    map.addLayer(layer);
    var numberOfPoints = layersPoints.length;
    let color;
    if (routeCounter == 0) color = 'red';
    if (routeCounter == 1) color = 'green';
    if (routeCounter == 2) color = 'blue';

    if(numberOfPoints > 1){
        var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
            color: color,
            width: 3
            })
        });
        if (element("option1").checked){
            calculateGreatCircleRoute(lonlat[0], lonlat[1], layersPositions[numberOfPoints-2][0], layersPositions[numberOfPoints-2][1], style);
        }
        else if (element("option2").checked) {
            
            var line = new ol.geom.LineString([ol.proj.fromLonLat(layersPositions[numberOfPoints-1]),ol.proj.fromLonLat(layersPositions[numberOfPoints-2])]);
            var lineFeature = new ol.Feature({
                geometry: line
            });
            var layer_line = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [lineFeature]
                })
            });
            layer_line.setStyle(style);
            layersLines.push(layer_line);
            map.addLayer(layer_line);
        }
        else {
            console.error("One type of route must be checked");
        }
    }
}

function RemoveAllPoints(){
    // Clearing all Routes
    if (routeCounter == 0){
        removeLinesAndPoints(Route_1);
        element("Show_route_1").checked = false;
        Route_1 = {
            layersPoints : [],
            layersPositions : [],
            layersLines :[]
        };
    }
    if (routeCounter == 1){
        removeLinesAndPoints(Route_2);
        element("Show_route_2").checked = false;
        Route_2 = {
            layersPoints : [],
            layersPositions : [],
            layersLines :[]
        };
    }
    if (routeCounter == 2){
        removeLinesAndPoints(Route_3);
        element("Show_route_3").checked = false;
        Route_3 = {
            layersPoints : [],
            layersPositions : [],
            layersLines :[]
        };
    }
    // Saving operands to current route and clearing operands
    // for loxodrome the number of lines is one less than number of points
    // for orthodrome the number of lines can be much higher
    // Looping over lines must be done separetely
    let len = layersPoints.length;
    for(var i = 0; i < len; i++) {

        if (routeCounter == 0){
            Route_1.layersPoints.push(layersPoints[0]);
            Route_1.layersPositions.push(layersPositions[0]);
        }
        else if (routeCounter == 1) {
            Route_2.layersPoints.push(layersPoints[0]);
            Route_2.layersPositions.push(layersPositions[0]);
        }
        else if (routeCounter == 2) {
            Route_3.layersPoints.push(layersPoints[0]);
            Route_3.layersPositions.push(layersPositions[0]);
        }
        
        map.removeLayer(layersPoints[0]);
        layersPoints.shift();
        layersPositions.shift();
    }
    let len2 = layersLines.length;
    for(var j = 0; j < len2; j++) {
        if (routeCounter == 0) Route_1.layersLines.push(layersLines[0]);
        else if (routeCounter == 1) Route_2.layersLines.push(layersLines[0]);
        else if (routeCounter == 2) Route_3.layersLines.push(layersLines[0]);
        map.removeLayer(layersLines[0]);
        layersLines.shift();
    }
}


function removeLinesAndPoints(Route){
    // Same as above
    let len = Route.layersPoints.length;
    for(let i = 0; i < len; i++){
        map.removeLayer(Route.layersPoints[i]);
    }
    let len2 = Route.layersLines.length;
    for(let i = 0; i < len2; i++){
        map.removeLayer(Route.layersLines[i]);
    }
}

function addLinesAndPoints(Route){
    let len = Route.layersPoints.length;
    for(let i = 0; i < len; i++){
        map.addLayer(Route.layersPoints[i]);
    }
    let len2 = Route.layersLines.length;
    for(let i = 0; i < len2; i++){
        map.addLayer(Route.layersLines[i]);
    }
}

function showLayer(layer){
    if (weatherForecastTime in layer) layer = layer[weatherForecastTime];
    let sourceUrl = layer.values_.source.key_;
    if (sourceUrl.includes(weatherTileUrl)){
        if(!layer.getVisible()){
            let zoom = map.getView().getZoom();
            if (map.getView().getZoom() > 7){
                zoom = 7;
            }
            map.setView(new ol.View({
                center: map.getView().getCenter(),
                zoom: zoom,
                maxZoom: 7
            }));
        }
        else if(!element("Wind_map").checked && !element("Precipation").checked && !element("Pressure_map").checked && !element("Temperature_map").checked){
            map.setView(new ol.View({
                center: map.getView().getCenter(),
                zoom: map.getView().getZoom(),
                maxZoom: 14
            }));
        }
        
    }
    if (element("Wind_map").checked){
        element('windScale').style.display = "";
    }
    else{
        element('windScale').style.display = "none";
    }
    if (element("Precipation").checked){
        element('PrecipationScale').style.display = "";
    }
    else{
        element('PrecipationScale').style.display = "none";
    }
    layer.setVisible(!layer.getVisible());
}



function showRoutes(routeCheckbox){
    if (routeCheckbox.id == "Show_route_1")
    {
        if (routeCheckbox.checked) addLinesAndPoints(Route_1);
        else removeLinesAndPoints(Route_1);
    }
    else if (routeCheckbox.id == "Show_route_2"){
        if (routeCheckbox.checked) addLinesAndPoints(Route_2);
        else removeLinesAndPoints(Route_2);
    }
    else if (routeCheckbox.id == "Show_route_3")
    {
        if (routeCheckbox.checked) addLinesAndPoints(Route_3);
        else removeLinesAndPoints(Route_3);
    }

}


function formatLonLatMessage(lonlat){
    let lat_symbol = 'N';
    let lon_symbol = 'E';
    let lon = lonlat[0];
    let lat = lonlat[1];
    if (lat < 0){
        lat_symbol = 'S';
        lat = Math.abs(lat);
    }
    if (lon < 0){
        lon_symbol = 'W';
        lon = Math.abs(lon);
    }
    lon = convertDecimalToDMS(lon);
    lat = convertDecimalToDMS(lat);
    return lat + lat_symbol + ' ' + lon + lon_symbol;
}

function validateInputs(latitude, longitude, NS, EW){
    if (!latitude && !longitude){
        return [NaN, NaN];
    }
    if (!latitude){
        return [longitude, NaN];
    }
    if (!longitude){
        return [NaN, latitude];
    }
    let lat = parseFloat(convertDMSToDecimal(latitude));
    let lon = parseFloat(convertDMSToDecimal(longitude));
    if (NS == 'S') lat = -lat;
    if (EW == 'W') lon = -lon;
    return [lon, lat];
}


function showDialog() {
    element('popup-content').innerHTML = '';
    RemoveAllPoints();

    if (dialogVisible){
        dialogVisible = false;
        dialog.remove();
        return;
    }
    dialogVisible = true;
    dialog = document.createElement("div");
    dialog.style.position = "fixed";
    dialog.style.top = "50%";
    dialog.style.left = "50%";
    dialog.style.transform = "translate(-50%, -50%)";
    dialog.style.backgroundColor = "white";
    dialog.style.padding = "20px";
    dialog.style.border = "1px solid black";

    let inputIndex = 0;

    document.body.appendChild(dialog);

    inputPoints = [];

    // Input N or S value
    let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter latitude " + (inputIndex + 1);
        dialog.appendChild(input);

    let optionN = document.createElement("option");
        optionN.value = "N";
        optionN.text = "N";

    let optionS = document.createElement("option");
        optionS.value = "S";
        optionS.text = "S";

    let selectNS = document.createElement("select");
        selectNS.id = 'selectNS';
        selectNS.add(optionN);
        selectNS.add(optionS);
    dialog.appendChild(selectNS);

    // Input E or W value
    let input2 = document.createElement("input");
        input2.type = "text";
        input2.placeholder = "Enter longitude " + (inputIndex + 1);
        dialog.appendChild(input2);

    let optionE = document.createElement("option");
        optionE.value = "E";
        optionE.text = "E";

    let optionW = document.createElement("option");
        optionW.value = "W";
        optionW.text = "W";

    let selectEW = document.createElement("select");
        selectEW.id = 'selectEW';
        selectEW.add(optionE);
        selectEW.add(optionW);
    dialog.appendChild(selectEW);

    let submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    dialog.appendChild(submitButton);

    submitButton.onclick = function() {
        lonlat= validateInputs(input.value, input2.value, selectNS.value, selectEW.value);
        let lon = lonlat[0];
        let lat = lonlat[1];
        if (!isNaN(lon) && !isNaN(lat)){
            inputPoints.push([lon, lat]);
            for (let i = 0; i < inputPoints.length; i++)
            {
                MarkPositions(inputPoints[i], element('popup-content'), map, layersPositions);
            }
            
            dialog.remove();
        }
        if (isNaN(lat)){
            window.alert("You entered wrong latitude!");
            input.value = "";
        }
        if (isNaN(lon)){
            window.alert("You entered wrong longitude!");
            input2.value = "";
        }
    };

    function EnterData(event) {
        if (event.key === "Enter") {
            lonlat = validateInputs(input.value, input2.value, selectNS.value, selectEW.value);
            let lon = lonlat[0];
            let lat = lonlat[1];
            if (!isNaN(lon) && !isNaN(lat)){
                inputPoints.push([lat, lon]);
                inputIndex++;
                input.value = "";
                input2.value = "";
                input.placeholder = "Enter latitude " + (inputIndex + 1);
                input2.placeholder = "Enter longitude " + (inputIndex + 1);
            }
            if (isNaN(lat)){
                window.alert("You entered wrong latitude!");
                input.value = "";
            }
            if (isNaN(lon)){
                window.alert("You entered wrong longitude!");
                input2.value = "";
            }
        }
    }

    input.onkeydown = EnterData; 
    input2.onkeydown = EnterData;
}

function readFile(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var dataFromFile = reader.result;
      if (dataFromFile){
        changeStringToPoints(dataFromFile);
      }
      else{
        console.error("File is empty");
      }
    };
    if(input.files[0]){
        reader.readAsText(input.files[0]);
    }
    else {
        console.error("Missing file");
    }
}

function saveFile(){
    var a = document.createElement("a");
    var output = changePointsToString();
    a.href = window.URL.createObjectURL(new Blob([output], {type: "text/plain"}));
    a.download = "route.txt";
    a.click();
}

async function changeStringToPoints(coordinatesFromFile){
    // function get coordinates and parses them to array
    // coordinates are in string where one line is one pair of coordinates
    // latitude and longitude in that order
    var lines = coordinatesFromFile.split(/\r?\n/);
    var point_info = lines.map(line => line.split(","));
    var waterFlag = false;
    RemoveAllPoints();
    element('popup-content').innerHTML = '';

    for (var i = 0; i < point_info.length; i++) {
        if (point_info[i] == '') continue;
        var point_info_separated = point_info[i].flatMap(str => str.match(/(\d+\°?\s?\d+\'?\s?\d+.\d+\"?)|(\d+(\.\d+)?)|([NSEW])/g));
        var lonlat = validateInputs(point_info_separated[0],point_info_separated[2],point_info_separated[1],point_info_separated[3]);
        if (i == 0){
            map.setView(new ol.View({
                center: ol.proj.fromLonLat([lonlat[0], lonlat[1]]),
                zoom: 6,
            }));
            //Timeout needed to zoom to other place
            let timeoutInMiliseconds = 2000;
            await new Promise(resolve => setTimeout(resolve, timeoutInMiliseconds));
        }
        var water = checkIfWater(lonlat[0], lonlat[1]);
        if(!isNaN(lonlat[0]) && !isNaN(lonlat[1]) && water){
            MarkPositions(lonlat, element('popup-content'), map, layersPositions);
        }
        if (!water) waterFlag = true;
    }
    if (waterFlag) window.alert("Some of your points were placed on the land. Please fix that");
    element('popup-content').innerHTML = '';
}

function changePointsToString(){
    // function get arrays of points and parses them string
    // coordinates are in string where one line is one pair of coordinates
    // latitude and longitude in that order
    var output = '';
    for (var i = 0; i < layersPositions.length; i++) {
        var LatitudeSymbol = "N";
        var LongitudeSymbol = "E";
        if (layersPositions[i][1] < 0){
            LatitudeSymbol =  "S";
        }
        if (layersPositions[i][0] < 0){
            LongitudeSymbol =  "W";
        }
        output += convertDecimalToDMS(Math.abs(layersPositions[i][1])).toString() + LatitudeSymbol + ',' + convertDecimalToDMS(Math.abs(layersPositions[i][0])).toString() + LongitudeSymbol +'\n';
    }
    return output;
}


function convertDecimalToDMS(decimal) {
    // Function to convert decimal degrees to degrees minutes seconds
    var degrees = Math.floor(decimal);
    var minutesDecimal = (decimal - degrees) * 60;
    var minutes = Math.floor(minutesDecimal);
    var seconds = (minutesDecimal - minutes) * 60;

    return degrees + "° " + minutes + "' " + seconds.toFixed(2) + "\"";
  }

function convertDMSToDecimal(DMS) {
    // Function to convert degrees minutes seconds to decimal
    DMS = DMS.replace(/["'°]/g, '');
    var parts = DMS.split(/\s/,3);
    var degrees = parts[0] ? parseFloat(parts[0]) : 0;
    var minutes = parts[1] ? parseFloat(parts[1]) : 0;
    var seconds = parts[2] ? parseFloat(parts[2]) : 0;
    return (degrees + minutes/60 + seconds/(60*60));
}

function getDataFromURL(url) {
    return fetch(url)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // or response.json() for JSON data
        })
        .then(data => {
        return data;
        })
        .catch(error => {
        throw new Error('There was a problem with the fetch operation: ' + error.message);
        });
}

function setElementTextFromURL(url, ele) {
    getDataFromURL(url)
    .then(data => {
        element(ele).textContent = data;
    })
    .catch(error => {
        console.error(error);
    });
}
/*  WATER API
    function Req(request, layersPoints, lonlat, content, map){
        water = 'abc'
        fetch(request)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                throw new Error('Something went wrong on API server!');
                }
            })
            .then(response => {
                // console.debug(response);
                if (response['water']){
                    // console.debug('WODA');
                    MarkPositions(layersPoints, lonlat, content, map)
                    water = true
                }
                else{
                    // console.debug('NIE WODA');
                    water = false
                }
                return water
                // ...
            }).catch(error => {
                console.error(error);
            });
        return water
    }
*/

function init(){
    createLayers();

    const view = new ol.View({
        center: ol.proj.fromLonLat([18, 57]),
        zoom: 6,
        maxZoom: 14,
        minZoom: 0
    });

    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            sealayer,
            marineTrafficLayer,
            layerSeamarks,
            weatherWindLayers["0h"],
            weatherWindLayers["6h"],
            weatherWindLayers["12h"],
            weatherWindLayers["24h"],
            weatherPressureLayers["0h"],
            weatherPressureLayers["6h"],
            weatherPressureLayers["12h"],
            weatherPressureLayers["24h"],
            weatherTemperatureLayers["0h"],
            weatherTemperatureLayers["6h"],
            weatherTemperatureLayers["12h"],
            weatherTemperatureLayers["24h"],
            weatherPrecipationLayers["0h"],
            weatherPrecipationLayers["6h"],
            weatherPrecipationLayers["12h"],
            weatherPrecipationLayers["24h"]
        ],
        view: view
    });

    var container = element('popup');
    var content = element('popup-content');
    var closer = element('popup-closer');

    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    map.addOverlay(overlay);

    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    clickOnMap(content, overlay);
    moveOnMap();
    wheelOnMap();
    const geolocation = new ol.Geolocation({
        // enableHighAccuracy must be set to true to have the heading value.
        trackingOptions: {
            enableHighAccuracy: true,
        },
        projection: view.getProjection(),
    });



    const accuracyFeature = new ol.Feature();
    geolocation.on('change:accuracyGeometry', function () {
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });
    const positionFeature = new ol.Feature();
    positionFeature.setStyle(
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#3399CC',
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2,
                }),
            })
        })
    );

    geolocation.on('change:position', function () {
        const coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
    });

    geolocation.on('error', function (error) {
        window.alert(error.message);
    });

    let geolayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [accuracyFeature, positionFeature],
        visible: false
        }),
    });
    map.addLayer(geolayer);

    var scaleLineControl = new ol.control.ScaleLine({
        units: 'metric', // Display the scale in kilometers
        bar: true, // Show the scale bar
        steps: 4, // Number of steps in the scale line
        text: false, // Show text on the scale bar
        minWidth: 100 // Minimum width of the scale bar in pixels
      });
      map.addControl(scaleLineControl);

    element('track').addEventListener('change', function () {
        geolocation.setTracking(this.checked);
        geolayer.setVisible(this.checked);
    });
    
    // element('calculate_position').addEventListener('click', function(){ 
    //     calculate_route(geolocation, layersPositions, map, sealayer)
    // });

    // element('Mark_points').addEventListener('change', function(){
    //     RemoveAllPoints()
    //     content.innerHTML = ''
    // });
    element('New_route').addEventListener('click', function(){
        RemoveAllPoints();
        content.innerHTML = '';
        countNewRoute();
    });

    element('transparencySlider').addEventListener('input', function () {
        var opacity = parseFloat(element('transparencySlider').value);
        weatherWindLayers['0h'].setOpacity(opacity);
        weatherWindLayers['6h'].setOpacity(opacity);
        weatherWindLayers['12h'].setOpacity(opacity);
        weatherWindLayers['24h'].setOpacity(opacity);
    });

    element('transparencySlider2').addEventListener('input', function () {
        var opacity = parseFloat(element('transparencySlider2').value);
        weatherPrecipationLayers['0h'].setOpacity(opacity);
        weatherPrecipationLayers['6h'].setOpacity(opacity);
        weatherPrecipationLayers['12h'].setOpacity(opacity);
        weatherPrecipationLayers['24h'].setOpacity(opacity);
    });

    setElementTextFromURL(weatherTileUrl + "wind_stream/0h/time.txt", 'weatherForecastTime0hText');
    setElementTextFromURL(weatherTileUrl + "wind_stream/6h/time.txt", 'weatherForecastTime6hText');
    setElementTextFromURL(weatherTileUrl + "wind_stream/12h/time.txt", 'weatherForecastTime12hText');
    setElementTextFromURL(weatherTileUrl + "wind_stream/24h/time.txt", 'weatherForecastTime24hText');
    const radioButtons = document.querySelectorAll('input[name="weatherForecastTime"]');
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener("change", function () {
            weatherForecastTime = document.querySelector('input[name="weatherForecastTime"]:checked').value;
            weatherLayers.forEach(function (weatherLayer){
                for (let time in weatherLayer){
                    if ((time != weatherForecastTime) && weatherLayer[time].getVisible()){
                        showLayer(weatherLayer[time]);
                        showLayer(weatherLayer[weatherForecastTime]);
                    }
                }
            });
        });
    });

}