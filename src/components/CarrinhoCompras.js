import React from 'react';

class CarrinhoCompras extends React.Component {
  // componentDidMount() {
  //   this.recoveryProducts();
  // }

  recoveryProducts = () => {
    const localArr = JSON.parse(localStorage.getItem('cartItems'));
    return localArr;
  };

  render() {
    const arr = this.recoveryProducts();
    return (
      <div>
        { arr === null || arr.length === 0 ? (
          <p
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio

          </p>)
          : arr.map((produto, index) => (
            <div key={ index }>
              <div data-testid="shopping-cart-product-quantity">{index}</div>
              <div data-testid="shopping-cart-product-name">{produto.name}</div>
              <div>{produto.price}</div>
              <img src={ produto.img } alt={ produto.name } />
            </div>
          ))}
      </div>
    );
  }
}
export default CarrinhoCompras;
