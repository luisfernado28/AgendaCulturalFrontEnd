import "./App.css";
import Router from "./components/Router";
import { BrowserRouter } from "react-router-dom";
import LayoutWrapper from "./components/Layoutwrapper";
import { useIdleTimer } from "react-idle-timer";
import { useDispatch } from "react-redux";
import { timeOutLogOut } from "./redux/authSlice";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import { orange } from "@mui/material/colors";

declare module "@mui/material/styles" {
	interface Theme {
		palette: {
			primary: {
				// light: will be calculated from palette.primary.main,
				main: string;
				// dark: will be calculated from palette.primary.main,
				// contrastText: will be calculated to contrast with palette.primary.main
			};
			neutral: {
				main: string;
			};
			mode:string;
		};
	}
	interface ThemeOptions {
		status?: {
			danger?: string;
		};
	}
	interface Palette {
		neutral: Palette["primary"];
	}

	// allow configuration using `createTheme`
	interface PaletteOptions {
		neutral?: PaletteOptions["primary"];
	}
}

declare module "@mui/material/IconButton" {
	interface IconButtonPropsColorOverrides {
		neutral: true;
	}
}
function App() {
	const dispatch = useDispatch();
	const theme = createTheme({
		palette: {
			primary: {
				// light: will be calculated from palette.primary.main,
				main: "#39B3BA",
				// dark: will be calculated from palette.primary.main,
				// contrastText: will be calculated to contrast with palette.primary.main
			},
			neutral: {
				main: "#ffffff",
			},
			mode: "light"
		},
		
	});
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
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<LayoutWrapper>
						<Router />
					</LayoutWrapper>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
