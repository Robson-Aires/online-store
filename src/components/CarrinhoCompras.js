import React from 'react';

class CarrinhoCompras extends React.Component {
  // componentDidMount() {
  //   this.recoveryProducts();
  // }

  recoveryProducts = () => {
    const localArr = JSON.parse(localStorage.getItem('cartItems'));
    return localArr;
  };

  /*   handleMains = ({ target }) => {
    const { innerText, name } = target;

    if (innerText === '+') {
      const data = this.recoveryProducts();
      const dataFilter = data.reduce((item) => (

      ));
      // localStorage.setItem('cartItems');
      /* dataFilter.quantity += 1; */
  /*       console.log(dataFilter);
      console.log(typeof dataFilter);
      console.log(typeof dataFilter.quantity);
    }
  };  */

  /* handleMore = () => {

  }; */

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
              <button
                data-testid="remove-product"
                type="button"
                onClick=""
              >
                x
              </button>
              <div data-testid="shopping-cart-product-name">{produto.title}</div>
              <button
                data-testid="product-increase-quantity"
                type="button"
                onClick=""
              >
                -
              </button>

              <div data-testid="shopping-cart-product-quantity">{produto.quantity}</div>

              <button
                name={ produto.title }
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ this.handleMains }
              >
                +
              </button>

              <div>{produto.price}</div>
              <img src={ produto.img } alt={ produto.title } />
            </div>
          ))}
      </div>
    );
  }
}
export default CarrinhoCompras;
