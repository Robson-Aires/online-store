import React from 'react';
import { Link } from 'react-router-dom';

class CarrinhoCompras extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      storedItems: [],
    };
  }

  componentDidMount() {
    this.recoveryProducts();
  }

  recoveryProducts = () => {
    const localArr = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({ storedItems: localArr });
    return localArr;
  };

  handleIncrease = ({ target }) => {
    const { name } = target;
    const data = this.recoveryProducts();
    const increaseData = data.map((item) => {
      if (item.title === name) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(increaseData));
    this.setState({ storedItems: increaseData });
  };

  handleDecrease = ({ target }) => {
    const { name } = target;
    const data = this.recoveryProducts();
    const decreaseData = data.map((item) => {
      if (item.title === name && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(decreaseData));
    this.setState({ storedItems: decreaseData });
  };

  handleRemove = ({ target }) => {
    const { name } = target;
    const data = this.recoveryProducts();
    const filteredData = data.filter((item) => item.title !== name);
    localStorage.setItem('cartItems', JSON.stringify(filteredData));
    this.setState({ storedItems: filteredData });
  };

  render() {
    const { storedItems } = this.state;
    return (
      <div>
        { storedItems === null || storedItems.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>)
          : storedItems.map((produto, index) => (
            <div key={ index }>
              <button
                name={ produto.title }
                data-testid="remove-product"
                type="button"
                onClick={ this.handleRemove }
              >
                x
              </button>
              <div data-testid="shopping-cart-product-name">{produto.title}</div>
              <button
                name={ produto.title }
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ this.handleDecrease }
              >
                -
              </button>

              <div data-testid="shopping-cart-product-quantity">{produto.quantity}</div>

              <button
                name={ produto.title }
                data-testid="product-increase-quantity"
                type="button"
                onClick={ this.handleIncrease }
              >
                +
              </button>

              <div>{produto.price}</div>
              <img src={ produto.img } alt={ produto.title } />
            </div>
          ))}
        <Link
          to={ {
            pathname: '/checkout',
          } }
        >
          <button
            type="button"
            data-testid="checkout-products"
          >
            Ir para a página de checkout
          </button>
        </Link>
      </div>
    );
  }
}
export default CarrinhoCompras;
