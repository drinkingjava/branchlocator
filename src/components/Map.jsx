import { useState, useEffect, useRef } from "react";
import leaflet from "leaflet";

import Autocomplete from "@tomickigrzegorz/autocomplete";
import "../../node_modules/@tomickigrzegorz/autocomplete/dist/css/autocomplete.min.css";
import { geojsonData } from "./geoJSON";

export default function Map() {
  const mapRef = useRef();
  const userMarkerRef = useRef();
  const autoCompleteRef = useRef();

  const [userGeoLocation, setUserGeoLocation] = useState({
    latitude: -33.8921342,
    longitude: 18.5597664013195,
  });

  const [geoJson] = useState(geojsonData);

  useEffect(() => {
    if (!mapRef.current.setView) {
      mapRef.current = leaflet
        .map("map")
        .setView([userGeoLocation.latitude, userGeoLocation.longitude], 13);
    } else {
      mapRef.current.setView(
        [userGeoLocation.latitude, userGeoLocation.longitude],
        13
      );
    }

    leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(mapRef.current);

    L.geoJSON(geoJson, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.popupContent);
      },
    }).addTo(mapRef.current);
  });

  useEffect(() => {
    if (userMarkerRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current);
    }
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
    new Autocomplete("search", {
      selectFirst: true,
      howManyCharacters: 2,

      onSearch: ({ currentValue }) => {
        const api = `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&countrycodes=za&q=${encodeURIComponent(
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
      onResults: ({ currentValue, matches, template }) => {
        const regex = new RegExp(currentValue, "gi");
        return matches === 0
          ? template
          : matches
              .map((element) => {
                return `
          <li class="loupe">
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

      // Submit event fires when clicking on a result
      onSubmit: ({ object }) => {
        const [lng, lat] = object.geometry.coordinates;
        setUserGeoLocation({ latitude: lat, longitude: lng });
      },
      // the method presents no results element
      noResults: ({ currentValue, template }) =>
        template(`<li>No results found: "${currentValue}"</li>`),
    });
  });

  return (
    <div className="w-full h-full">
      <div className="auto-search-wrapper z-9999 h-1/18">
        <input
          type="text"
          autoComplete="off"
          id="search"
          className="w-full"
          placeholder="Search and select your location e.g Canal Walk"
          ref={autoCompleteRef}
        />
      </div>
      <div className="h-17/18" id="map" ref={mapRef}></div>
    </div>
  );
}
