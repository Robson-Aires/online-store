import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class ProductDetails extends React.Component {
  saveCartItems = (parameter) => {
    if (!localStorage.getItem('cartItems')) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    const storage = JSON.parse(localStorage.getItem('cartItems'));
    const isItemAlreadyInCart = storage
      .find((item) => item.title === parameter.title);
    if (isItemAlreadyInCart) {
      const storageWithoutItem = storage.filter((item) => item.title !== parameter.title);
      isItemAlreadyInCart.quantity += 1;
      storageWithoutItem.push(isItemAlreadyInCart);
      localStorage.setItem('cartItems', JSON.stringify(storageWithoutItem));
    } else {
      const newstorage = [...storage, parameter];
      localStorage.setItem('cartItems', JSON.stringify(newstorage));
    }
  };

  CartAdd = (item) => {
    const arrayofObject = {
      price: item.price,
      title: item.title,
      img: item.thumbnail,
      quantity: 1,
    };
    this.saveCartItems(arrayofObject);
  };

  render() {
    // const { item } = this.props.location.state;
    const { location: { state: { item } } } = this.props;

    return (

      <>
        <div key={ item.id }>
          <p data-testid="product-detail-name">{item.title}</p>
          <p data-testid="product-detail-price">{item.price}</p>
          <img
            src={ item.thumbnail }
            alt={ item.title }
            data-testid="product-detail-image"
          />
          <button
            type="button"
            name={ item.id }
            onClick={ () => this.CartAdd(item) }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao carrinho
          </button>
        </div>
        <Link
          to="/carrinhocompras"
        >
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Ir para a página do carrinho de compras
          </button>
        </Link>

      </>

    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      item: PropTypes.objectOf,
    }),
  }).isRequired,
};

export default ProductDetails;
