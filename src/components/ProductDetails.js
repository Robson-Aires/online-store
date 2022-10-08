import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class ProductDetails extends React.Component {
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
