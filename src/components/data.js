const userLocation = [18.5597664013195, -33.8921342]
const places = [
  {
    place_id: 29476537,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    osm_type: "node",
    osm_id: 7902234685,
    lat: "-34.0216792",
    lon: "18.4443572",
    category: "amenity",
    type: "bank",
    place_rank: 30,
    importance: 7.441443503466877e-5,
    addresstype: "amenity",
    name: "Capitec Bank",
    display_name:
      "Capitec Bank, Coniston Way, Sillery, Constantia, Cape Town, City of Cape Town, Western Cape, 7806, South Africa",
    boundingbox: ["-34.0217292", "-34.0216292", "18.4443072", "18.4444072"],
  },
  {
    place_id: 29439940,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    osm_type: "node",
    osm_id: 11341329569,
    lat: "-33.8929155",
    lon: "18.5121780",
    category: "amenity",
    type: "bank",
    place_rank: 30,
    importance: 7.441443503466877e-5,
    addresstype: "amenity",
    name: "Capitec Bank",
    display_name:
      "Capitec Bank, Century Boulevard, Milnerton, City of Cape Town, Western Cape, 7404, South Africa",
    boundingbox: ["-33.8929655", "-33.8928655", "18.5121280", "18.5122280"],
  },
  {
    place_id: 29784999,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    osm_type: "node",
    osm_id: 4383661864,
    lat: "-33.9335055",
    lon: "18.5106357",
    category: "amenity",
    type: "bank",
    place_rank: 30,
    importance: 7.441443503466877e-5,
    addresstype: "amenity",
    name: "Capitec Bank",
    display_name:
      "Capitec Bank, Logan Way, Pinelands, Cape Town, City of Cape Town, Western Cape, 7405, South Africa",
    boundingbox: ["-33.9335555", "-33.9334555", "18.5105857", "18.5106857"],
  },
  {
    place_id: 29268169,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    osm_type: "node",
    osm_id: 5124811842,
    lat: "-33.9296735",
    lon: "18.4494969",
    category: "amenity",
    type: "bank",
    place_rank: 30,
    importance: 7.441443503466877e-5,
    addresstype: "amenity",
    name: "Capitec Woodstock",
    display_name:
      "Capitec Woodstock, 172, Victoria Road, Cape Town Ward 115, Cape Town, City of Cape Town, Western Cape, 7925, South Africa",
    boundingbox: ["-33.9297235", "-33.9296235", "18.4494469", "18.4495469"],
  },
  {
    place_id: 29564316,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    osm_type: "node",
    osm_id: 12133606001,
    lat: "-33.9890278",
    lon: "18.4848136",
    category: "amenity",
    type: "bank",
    place_rank: 30,
    importance: 7.441443503466877e-5,
    addresstype: "amenity",
    name: "Capitec",
    display_name:
      "Capitec, Loch Road, Wyndover, Claremont, Cape Town, City of Cape Town, Western Cape, 7708, South Africa",
    boundingbox: ["-33.9890778", "-33.9889778", "18.4847636", "18.4848636"],
  },
];
function toGeoJSON(nominatumRes){
  nominatumRes.map((place)=> {
    return {
      type: "Feature",
      properties: {
        name: place.name,
        amenity: place.category,
        popupContent: place.display_name,
      },
      geometry: {
        type: "Point",
        coordinates: [place.lat, place.lon],
      },
    };
  })
}
console.log(toGeoJSON(places));
