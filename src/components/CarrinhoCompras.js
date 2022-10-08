import React from 'react';

class CarrinhoCompras extends React.Component {
  componentDidMount() {
    this.recoveryProducts();
  }

  recoveryProducts = () => {
    localStorage.getItem('cartItems');
  };

  render() {
    return (
      <div
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio
      </div>
    );
  }
}
export default CarrinhoCompras;
