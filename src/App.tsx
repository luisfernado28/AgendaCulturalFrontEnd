import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Router from './components/Router';
import { BrowserRouter } from 'react-router-dom';
import LayoutWrapper from './components/Layoutwrapper';

function App() {
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
