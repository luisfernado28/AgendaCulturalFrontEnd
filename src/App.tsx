import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Router from './components/Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <header className="App-header">
          <Router />
        </header>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
