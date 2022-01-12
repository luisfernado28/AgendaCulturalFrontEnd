import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Router from "./components/Router";
import { BrowserRouter } from "react-router-dom";
import LayoutWrapper from "./components/Layoutwrapper";
import { useIdleTimer } from "react-idle-timer";

function App() {
	const handleOnIdle = (event) => {
		console.log("user is idle", event);
		console.log("last active", getLastActiveTime());
	};

	const handleOnActive = (event) => {
		console.log("user is active", event);
		console.log("time remaining", getRemainingTime());
	};

	const handleOnAction = (event) => {
		console.log("user did something", event);
	};

	const { getRemainingTime, getLastActiveTime } = useIdleTimer({
		timeout: 900000, //15 min
		onIdle: handleOnIdle,
		onActive: handleOnActive,
		onAction: handleOnAction,
		debounce: 500,
	});

	return (
		<div className="App">
			<BrowserRouter>
				<LayoutWrapper>
					<Router />
				</LayoutWrapper>
			</BrowserRouter>
		</div>
	);
}

export default App;
