import { useEffect, useRef } from "react";
import leaflet from "leaflet";
import useLocalStorage from "../hooks/useLocalStorage";
import useGeolocation from "../hooks/useGeolocation";
import { useState } from "react";

var geojsonFeature = {
  type: "Feature",
  properties: {
    name: "Coors Field",
    amenity: "Baseball Stadium",
    popupContent: "This is where the Rockies play!",
  },
  geometry: {
    type: "Point",
    coordinates: [-104.99404, 39.75621],
  },
};

export default function Map() {
  const mapRef = useRef();
  const userMarkerRef = useRef();
  const autoCompleteRef = useRef();
  const [userGeoLocation, setUserGeoLocation] = useState({
    latitude: -33.8921342,
    longitude: 18.5597664013195,
  });

  // const [userGeoLocation, setUserPosition] = useState({latitude: 0, longitude: 0});

  // const [userPosition, setUserPosition] = useLocalStorage("USER_MARKER", {
  //   latitude: 0,
  //   longitude: 0,
  // });
  const [nearbyMarkers, setNearbyMarkers] = useState([
    {
      type: "Feature",
      properties: {
        place_id: 29476537,
        name: "Capitec Bank",
        amenity: "Bank",
        popupContent:
          "Capitec Bank, Coniston Way, Sillery, Constantia, Cape Town, City of Cape Town, Western Cape, 7806, South Africa",
      },
      geometry: {
        type: "Point",
        coordinates: [-34.0216792, 18.4443572],
        lat: "-34.0216792",
        lon: "18.4443572",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Capitec Bank",
        amenity: "Bank",
        popupContent:
          "Capitec Bank, Century Boulevard, Milnerton, City of Cape Town, Western Cape, 7404, South Africa",
      },
      geometry: {
        type: "Point",
        coordinates: [-33.8929155, 18.512178],
      },
    },
  ]);

  // const [nearbyMarkers, setNearbyMarkers] = useLocalStorage(
  //   "NEARBY_MARKERS",
  //   []
  // );
  // console.log(nearbyMarkers)

  // const location = useGeolocation(); // prompt user location or autoset geolocation

  // Create Map and set view to default user position(0,0).
  useEffect(() => {
    mapRef.current = leaflet
      .map("map")
      .setView([userGeoLocation.latitude, userGeoLocation.longitude], 13);

    leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(mapRef.current);

    nearbyMarkers.forEach((marker) => {
      const geo = marker.geometry;
      leaflet
        .marker([geo.coordinates[0], geo.coordinates[1]])
        .addTo(mapRef.current)
        .bindPopup(`${marker.properties.popupContent}`);
    });
    // nearbyMarkers.forEach(({ latitude, longitude }) => {
    //   leaflet
    //     .marker([latitude, longitude])
    //     .addTo(mapRef.current)
    //     .bindPopup(
    //       `lat: ${latitude.toFixed(2)}, long: ${longitude.toFixed(2)}`
    //     );
    // });

    // mapRef.current.addEventListener("click", (e) => {
    //   /** Creates new marker when clicking on a non-marker */
    //   const { lat: latitude, lng: longitude } = e.latlng;
    //   leaflet
    //     .marker([latitude, longitude])
    //     .addTo(mapRef.current)
    //     .bindPopup(
    //       `lat: ${latitude.toFixed(2)}, long: ${longitude.toFixed(2)}`
    //     );

    //   setNearbyMarkers((prevMarkers) => [
    //     ...prevMarkers,
    //     { latitude, longitude },
    //   ]);
    // });
  }, [nearbyMarkers, userGeoLocation.latitude, userGeoLocation.longitude]);

  useEffect(() => {
    // setUserPosition({ ...userPosition });

    // if (userMarkerRef.current) {
    //   mapRef.current.removeLayer(userMarkerRef.current);
    // }
    // const userGeoLocation = { latitude: -33.8921342, longitude: 18.5597664013195 };

    userMarkerRef.current = leaflet
      .marker([userGeoLocation.latitude, userGeoLocation.longitude])
      .addTo(mapRef.current)
      .bindPopup("Your Current Location")
      .togglePopup();

    const el = userMarkerRef.current.getElement();
    if (el) {
      el.style.filter = "hue-rotate(120deg)";
    }

    mapRef.current.setView([
      userGeoLocation.latitude,
      userGeoLocation.longitude,
    ]);
  }, [userGeoLocation.latitude, userGeoLocation.longitude]);


  useEffect(() => {
    // minimal configure
    new Autocomplete("search", {
      // default selects the first item in
      // the list of results
      selectFirst: true,

      // The number of characters entered should start searching
      howManyCharacters: 2,

      // onSearch
      onSearch: ({ currentValue }) => {
        // You can also use static files
        // const api = '../static/search.json'
        const api = `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&city=${encodeURI(
          currentValue
        )}`;
        return new Promise((resolve) => {
          fetch(api)
            .then((response) => response.json())
            .then((data) => {
              resolve(data.features);
            })
            .catch((error) => {
              console.error(error);
            });
        });
      },
      // nominatim GeoJSON format parse this part turns json into the list of
      // records that appears when you type.
      onResults: ({ currentValue, matches, template }) => {
        const regex = new RegExp(currentValue, "gi");

        // if the result returns 0 we
        // show the no results element
        return matches === 0
          ? template
          : matches
              .map((element) => {
                return `
          <li class="loupe z-index">
            <p>
              ${element.properties.display_name.replace(
                regex,
                (str) => `<b>${str}</b>`
              )}
            </p>
          </li> `;
              })
              .join("");
      },

      // we add an action to enter or click
      onSubmit: ({ object }) => {
        // remove all layers from the map
        mapRef.current.eachLayer(function (layer) {
          if (!!layer.toGeoJSON) {
            mapRef.current.removeLayer(layer);
          }
        });

        const { display_name } = object.properties;
        const [lng, lat] = object.geometry.coordinates;

        const marker = L.marker([lat, lng], {
          title: display_name,
        });

        marker.addTo(mapRef.current).bindPopup(display_name);

        mapRef.current.setView([lat, lng], 8);
      },

      // get index and data from li element after
      // hovering over li with the mouse or using
      // arrow keys ↓ | ↑
      onSelectedItem: ({ index, element, object }) => {
        console.log("onSelectedItem:", index, element, object);
      },

      // the method presents no results element
      noResults: ({ currentValue, template }) =>
        template(`<li>No results found: "${currentValue}"</li>`),
    });
  })
  return (
    <div className="w-full">
      <div className="auto-search-wrapper">
        <input
          type="text"
          autoComplete="off"
          id="search"
          className="full-width"
          placeholder="enter the city name"
          ref={autoCompleteRef}
        />
      </div>
      <div id="map" ref={mapRef}></div>
    </div>
  );
}
