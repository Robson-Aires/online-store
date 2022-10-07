import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import TelaPrincipal from './components/TelaPrincipal';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ TelaPrincipal } />
      </BrowserRouter>
    );
  }
}

export default App;
