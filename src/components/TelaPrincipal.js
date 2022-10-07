import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

class TelaPrincipal extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      displayResult: false,
      searchResult: [],
    };
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  searchItemsButton = async () => {
    const { searchInput } = this.state;
    const apiResponse = await getProductsFromCategoryAndQuery(searchInput);
    this.setState({
      searchResult: apiResponse,
      displayResult: true,
    });
  };

  render() {
    const { searchInput, displayResult, searchResult } = this.state;
    return (
      <>
        <input
          data-testid="query-input"
          name="searchInput"
          value={ searchInput }
          type="text"
          onChange={ this.onInputChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.searchItemsButton }
        >
          Buscar
        </button>

        { searchInput.length === 0
          ? (
            <div
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </div>
          )

          : console.log('oi') }

        { displayResult
          ? (
            searchResult
              .map((item) => (
                <div key={ item.id } data-testid="product">
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                  <img src={ item.thumbnail } alt={ item.title } />
                </div>
              ))

          )
          : (
            <div>
              <p>Nenhum produto foi encontrado</p>
            </div>)}
      </>
    );
  }
}

export default TelaPrincipal;
