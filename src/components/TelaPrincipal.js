import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TelaPrincipal extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
    };
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    const { searchInput } = this.state;
    return (
      <>
        <input
          name="searchInput"
          value={ searchInput }
          type="text"
          onChange={ this.onInputChange }
        />

        { searchInput.length === 0
          ? (
            <div
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </div>
          )

          : console.log('oi') }

        <Link
          data-testid="shopping-cart-button"
          to="/carrinhocompras"
        >
          Ir para Carrinho de Compras
        </Link>
      </>
    );
  }
}

export default TelaPrincipal;
