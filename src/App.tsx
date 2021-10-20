import React from 'react';
import logo from './logo.svg';
import ListPage from './features/welcome/Listpage';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <ListPage />
      </header>
      <Footer />
    </div>
  );
}

export default App;
