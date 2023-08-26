# SeaRouteMapper

Sea Route Mapper is a tool to plan routes on the water

## Features
- [Weather Forecast](#weather-forecast)
- [Sea marks](#sea-marks)
- [Planning routes](#planning-routes)
- [Two types of lines](#two-types-of-lines)
- [Saving planned routes to file](#saving-planned-routes-to-file)
- [Showing entered route from file](#showing-entered-route-from-file)
- [Enter coordinates of route one by one](#enter-coordinates-of-route-one-by-one)
- [Saving up to 3 routes](#saving-up-to-3-routes)
- [Information about position on the map](#information-about-position-on-the-map)
- [Tracking localization](#tracking-localization)
- [Other](#other)

## Details - How to use
Below there are detailed information about all the features with examples of usage
### Weather Forecast
The weather forecast contains information about wind stream, surface pressure, temperature and precipitation. The application has four radio buttons that enable select the forecast for specific hour in the future - measured in relative time  - 0h, 6h, 12h, 24h from now. All the data are retrieved from the [weather open port guide](https://weather.openportguide.de/)

<p align="center">
  <img src="resources/readme/weather-forecast.png" alt="Weather forecast"/>
</p>

[!WARNING]
All of above layers work with maximal zoom equals 7 - to zoom the map more the user has to uncheck all of the weather layers.

[!NOTE]
Your note text here
For the wind stream and precipitation there is available slider to set the opacity of the layers - to improve the readability of the map.

### Sea marks
Sea marks contains two types of information:
- Ships on the sea - tracking live presence of the other ships 
- Static sea marks like ports, harbors, inland navigation or lights

The data about other ships are from [MarineTraffic](https://www.marinetraffic.com/) and the data about sea marks are from [OpenSeaMap](https://openseamap.org/)
<p align="center">
  <img src="resources/readme/sea-marks.png" alt="Weather forecast"/>
</p>

### Planning routes
By default clicking on the map gives information about clicked points - if user wants to plan the route by marking points he/she should check the "Mark points" checkbox

<p align="center">
  <img src="resources/readme/mark-points.png" alt="Weather forecast"/>
</p>

### Two types of lines
User can choose between two types of lines - [loxodrome (rhumb line)](https://en.wikipedia.org/wiki/Rhumb_line) or [orthodrome (great circle)](https://en.wikipedia.org/wiki/Great_circle)

<p align="center">
  <img src="resources/readme/two-lines.png" alt="Weather forecast"/>
</p>
<p align="center">
  <img src="resources/readme/loxodrome.png" alt="Weather forecast" height="220" width="45%"/>
  <img src="resources/readme/orthodrome.png" alt="Weather forecast" height="220" width="45%"/>
</p>
<p align="center">
  <em>loxodrome vs orthodrome</em>
</p>

### Saving planned routes to file
There is an option to save planned route. The name of the file will be "route.txt"
<p align="center">
  <img src="resources/readme/save-points-to-file.png" alt="Weather forecast"/>
</p>

[!NOTE]
Example of the "route.txt" file:
<p align="center">
  <img src="resources/readme/route-image.png" alt="Weather forecast"/>
</p>

### Showing entered route from file
User can load csv or txt file. The notation can be decimal or degrees/minutes/seconds

<p align="center">
  <img src="resources/readme/load-file.png" alt="Weather forecast"/>
</p>

[!NOTE]
Examples of files:
<p align="center">
  <img src="resources/readme/route-image.png" alt="Weather forecast" height="100" width="30%"/> 
  <img src="resources/readme/route-image2.png" alt="Weather forecast" height="100" width="30%"/>
  <img src="resources/readme/route-image3.png" alt="Weather forecast" height="100" width="30%"/>
</p>
<p align="center">
  <em>degrees notation with and without symbols vs decimal notation</em>
</p>


### Enter coordinates of route one by one
User can pass points one by one. To make another point he/she needs to press the enter key. To submit user should press the submit button

<p align="center">
  <img src="resources/readme/enter-points.png" alt="Weather forecast"/>
</p>

<p align="center">
  <img src="resources/readme/enter-points2.png" alt="Weather forecast"/>
</p>

### Saving up to 3 routes
User can save up to three routes which are stored in the memory. Each route has different color - 1st is red, 2nd is green, 3rd is blue. To save the route to memory user have to click "Save and start new route" button. To show specific route user should check proper checkbox.

<p align="center">
  <img src="resources/readme/show-routes.png" alt="Weather forecast"/>
</p>

<p align="center">
  <img src="resources/readme/show-routes2.png" alt="Weather forecast"/>
</p>

<p align="center">
  <em>Example routes stored in the memory</em>
</p>

### Information about position on the map
There are tools on the map that help specify the position and distance on the map. A scale at the bottom left helps measure distance between two points. There is also information about coordinates of points pointed by the mouse and current zoom in the bottom right corner


[!NOTE]
Please keep in mind that the scale resizes automatically even without zooming. The map is the Mercator projection.

<p align="center">
  <img src="resources/readme/scale.png" alt="Weather forecast"/>
</p>

<p align="center">
  <img src="resources/readme/coordinates.png" alt="Weather forecast"/>
</p>

### Tracking localization
There is possibility to turn on tracking your current position - the event is managed by user's browser - he/she can agree or disable to be localized

<p align="center">
  <img src="resources/readme/track-position.png" alt="Weather forecast"/>
</p>

### Other
- If user clicks on the land the warning will be shown - the tool checks if user is not passing not valid data
