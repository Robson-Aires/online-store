import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import TelaPrincipal from './components/TelaPrincipal';
import CarrinhoCompras from './components/CarrinhoCompras';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ TelaPrincipal } />
        <Route path="/carrinhocompras" component={ CarrinhoCompras } />
      </BrowserRouter>
    );
  }
}

export default App;
