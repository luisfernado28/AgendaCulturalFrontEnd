import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { useMediaQuery } from "@mui/material";

interface MapProps {
	markerCoordinates: number[];
	type: string; //Infromative or Picker
	valueOfLocal: Function;
}

const center = {
	lat: -16.49542163483714,
	lng: -68.13353376825822,
};
const Maps = (props: MapProps): JSX.Element => {
	const matchesMinWidh600 = useMediaQuery("(min-width:600px)");

	const containerStyle = {
		width: matchesMinWidh600 ? "400px" : "330px",
		height: matchesMinWidh600 ? "400px" : "300px",
	};
	const [map, setMap] = React.useState(null);
	const [marker, setmarker] = React.useState({
		lat: props.markerCoordinates[0],
		lng: props.markerCoordinates[1],
	});

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyDDBcXB8d1K9mE4IeKdnlWWR-l6pRMKZcU",
	});

	const onLoad2 = (marker) => {
		// console.log("marker: ", marker);
	};

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(center);
		// map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	if (props.type === "Picker") {
		const onClick = (e: google.maps.LatLng) => {
			setmarker({ lat: e.lat(), lng: e.lng() });
			props.valueOfLocal(e);
		};
		return isLoaded ? (
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={11}
				onLoad={onLoad}
				onUnmount={onUnmount}
				onClick={(e: google.maps.MapMouseEvent) => {
					onClick(e.latLng);
				}}
			>
				{marker ? (
					<Marker onLoad={onLoad2} position={marker} />
				) : (
					<div></div>
				)}
			</GoogleMap>
		) : (
			<></>
		);
	} else {
		let showMarker = false;
		const position = {
			lat: -16.49542163483714,
			lng: -68.13353376825822,
		};
		if (props.markerCoordinates !== []) {
			showMarker = true;

			position.lat = props.markerCoordinates[0];
			position.lng = props.markerCoordinates[1];
		}
		return isLoaded ? (
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={11}
				onLoad={onLoad}
				onUnmount={onUnmount}
				onClick={(e: any) => {
					console.log(e);
				}}
			>
				{showMarker ? (
					<Marker onLoad={onLoad2} position={position} />
				) : (
					<div>bbbbbbbbbbbbbbbbbbbbbb</div>
				)}
			</GoogleMap>
		) : (
			<></>
		);
	}
};
export default Maps;
