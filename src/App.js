import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import CarrinhoCompras from './components/CarrinhoCompras';
import Checkout from './components/Checkout';
import ProductDetails from './components/ProductDetails';
import TelaPrincipal from './components/TelaPrincipal';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ TelaPrincipal } />
        <Route path="/carrinhocompras" component={ CarrinhoCompras } />
        <Route path="/productdetails/:id" component={ ProductDetails } />
        <Route path="/checkout" component={ Checkout } />

      </BrowserRouter>
    );
  }
}

export default App;
