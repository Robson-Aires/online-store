import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import RateProduct from './RateProduct';

class ProductDetails extends React.Component {
  saveCartItems = (parameter) => {
    if (!localStorage.getItem('cartItems')) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    const storage = JSON.parse(localStorage.getItem('cartItems'));
    const isItemAlreadyInCart = storage
      .find((item) => item.title === parameter.title);
    if (isItemAlreadyInCart) {
      const mappedData = storage.map((item) => {
        if (item.title === parameter.title) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(mappedData));
    } else {
      const newstorage = [...storage, parameter];
      localStorage.setItem('cartItems', JSON.stringify(newstorage));
    }
  };

  CartAdd = (item) => {
    const arrayofObject = {
      price: item.price, title: item.title, img: item.thumbnail, quantity: 1,
    };

    this.saveCartItems(arrayofObject);
  };

  render() {
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
        <RateProduct
          id={ item.id }
        />
      </>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      item: PropTypes.shape({
        price: PropTypes.number,
        title: PropTypes.string,
        img: PropTypes.string,
        quantity: PropTypes.number,
        thumbnail: PropTypes.string,
        id: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default ProductDetails;
