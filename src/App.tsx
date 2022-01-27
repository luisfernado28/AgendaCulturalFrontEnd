import "./App.css";
import Router from "./components/Router";
import { BrowserRouter } from "react-router-dom";
import LayoutWrapper from "./components/Layoutwrapper";
import { useIdleTimer } from "react-idle-timer";
import { useDispatch } from "react-redux";
import { timeOutLogOut } from "./redux/authSlice";

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
