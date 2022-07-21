import React from "react";
import { MapContainer, Marker, Popup, TileLayer,useMap } from "react-leaflet";
import { Icon } from "leaflet";
import * as plotData from "./data/plots.json";
import { useEffect, useState } from "react";
import "./App.css";

import {
  Circle,
  FeatureGroup,
  LayerGroup,
  Polygon,
  Rectangle,
  Tooltip
} from 'react-leaflet'

export const icon = new Icon({
  iconUrl: "/talkinglands-logo.svg",
  iconSize: [25, 25]
});

const center = [12.980145, 77.579475]

const multiPolygon = [
  [
    [12.983438, 77.564340],
    [12.974206, 77.565230],
    [12.974781, 77.574125],
  ]
]



// export const icon_farm = new Icon({
//   iconUrl: "/farm-logo.svg",
//   iconSize: [25, 25]
// });

export default function App() {

  let map = useMap();

  console.log(map.getZooom())

  const [activePark, setActivePark] = React.useState(null);
  const [radiusvalue,seteadiusvalue]= useState(800);

  

  const fillBlueOptions = { fillColor: 'blue' }
  const fillRedOptions = { fillColor: 'red' }
  const [color, setColor] = useState("red");
  // const greenOptions = { color: 'green', fillColor: 'green' }
  // const purpleOptions = { color: 'purple' }

  return (
    <MapContainer center={[12.971599, 77.594566]} zoom={15} scrollWheelZoom={true}>
    var myZoom_18 = zoom={18};
    var myZoom_17 = zoom={17};
    var myZoom_16 = zoom={16};
    var myZoom_15 = zoom={15};
    var myZoom_14 = zoom={14};
    var myZoom_13 = zoom={13};
    var myZoom_12 = zoom={12};
    var myZoom_11 = zoom={11};
    var myZoom_10 = zoom={10};
    var myZoom_9 = zoom={9};
    var myZoom_8 = zoom={8};
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

    
      {/* <Circle center={center} pathOptions={fillBlueOptions} radius={600} /> */}
      {/* const zoom_8 = zoom={8} */}
      <LayerGroup>
      <Circle
          center={[12.965516, 77.577040]}
          pathOptions={fillBlueOptions}
          >
            <Tooltip sticky>
              <div>
                <p>Best buy for old people, as the place is quiter and situated outside the busy area of the city</p>
              </div>
            </Tooltip>
          </Circle>
      </LayerGroup>


      <LayerGroup>
        <Circle
            center={[12.974212, 77.597038]}
            pathOptions={{fillcolor: 'green'}}
            radius={800}>
              <Tooltip sticky>
                {/* <div class="tooltip-big-circle">
                  <img class="arrow-img" src="./tl-arrow-logo.png" alt="arrow" />
                  <p class="tooltip-text">Prices of plot in this area is all set to rise. Book Your Dream Plot Now....</p>
                </div> */}
                <div class="tooltip-big-circle">
                  <img class="arrow-img" src="./tool-tip-img-cropped.png" alt="arrow" />
                </div>
              </Tooltip>
            </Circle>
      </LayerGroup>


      <LayerGroup>
        <Polygon pathOptions={{ color }} positions={multiPolygon}>
          <Tooltip class="parmanent-tooltip" sticky>
            <div class="parmanent-tooltip-text">
              <h4>SOLD OUT</h4>
            </div>
          </Tooltip>
        </Polygon>
      </LayerGroup>
      
    
      

      {plotData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[0],
            park.geometry.coordinates[1]
          ]}
          onClick={() => {
            setActivePark(park);
          }}
          icon={icon}
        />
      ))}

      {activePark && (
        <Popup class = "popup-class"
          position={[
            activePark.geometry.coordinates[0],
            activePark.geometry.coordinates[1]
          ]}
          onClose={() => {
            setActivePark(null);
          }}
        >
          <div>
            <h2>{activePark.properties.NAME}</h2>
            <p>{activePark.properties.DESCRIPTIO}</p>
          </div>
          <div class="property-faces">
            <h3>{activePark.properties.DESCRIPT_1}</h3>
          </div>
          <div class="propert-img">
            <img class="property-img" src={activePark.properties.PLOT_IMG} alt="plot"/>
          </div>
          <div class="buy-btn">
            <button class="button-28" role="button">Buy Now</button>
            {/* <button class="button-28" role="button">Add to Wish List</button> */}
          </div>
        </Popup>
      )}
    </MapContainer>
  );
}
