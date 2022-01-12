import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Router from "./components/Router";
import { BrowserRouter, useHistory } from "react-router-dom";
import LayoutWrapper from "./components/Layoutwrapper";
import { useIdleTimer } from "react-idle-timer";
import { useDispatch } from "react-redux";
import { LogOut } from "./redux/authSlice";

function App() {
	const history = useHistory();
	const dispatch = useDispatch();
	const handleOnIdle = () => {
		dispatch(LogOut());
	};

	const { getRemainingTime, getLastActiveTime } = useIdleTimer({
		timeout: 120000,//900000, //15 min
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
