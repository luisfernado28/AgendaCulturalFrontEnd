import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

const containerStyle = {
	width: "400px",
	height: "400px",
};

interface MapProps {
	markerCoordinates: number[];
}

const Maps = (props: MapProps): JSX.Element => {
	const latitude = props.markerCoordinates[0];
	const longitude = props.markerCoordinates[1];
	const position = {
		lat: latitude,
		lng: longitude,
	};

	const center = {
		lat: latitude,
		lng: longitude,
	};
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyDDBcXB8d1K9mE4IeKdnlWWR-l6pRMKZcU",
	});

	const onLoad2 = (marker) => {
		console.log("marker: ", marker);
	};
	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(center);
		// map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={16}
			onLoad={onLoad}
			onUnmount={onUnmount}
			onClick={(e: any) => {
				console.log(e);
			}}
		>
			<Marker onLoad={onLoad2} position={position} />
		</GoogleMap>
	) : (
		<></>
	);
};
export default Maps;
