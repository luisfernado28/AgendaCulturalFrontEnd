import "./App.css";
import Router from "./components/Router";
import { BrowserRouter } from "react-router-dom";
import LayoutWrapper from "./components/Layoutwrapper";
import { useIdleTimer } from "react-idle-timer";
import { useDispatch } from "react-redux";
import { timeOutLogOut } from "./redux/authSlice";
import { CssBaseline } from "@mui/material";
import ReactGA from "react-ga4";
import { useEffect } from "react";

function App() {
	const dispatch = useDispatch();
	const handleOnIdle = () => {
		dispatch(timeOutLogOut());
	};

	const { getRemainingTime, getLastActiveTime } = useIdleTimer({
		timeout: 900000, //15 min
		onIdle: handleOnIdle,
		debounce: 500,
	});
	useEffect(() => {
		ReactGA.initialize("G-WTYX04MB5Y");
		// ReactGA.send("pageview");
		ReactGA.event({
			category: "Consumidores agenda cultural",
			action: "Uso de aplicacion",
			//label: "load page", // optional
		  });
	}, []);
	return (
		<div className="App">
			<CssBaseline />
			<BrowserRouter>
				<LayoutWrapper>
					<Router />
				</LayoutWrapper>
			</BrowserRouter>
		</div>
	);
}

export default App;
