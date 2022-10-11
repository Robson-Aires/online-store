import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class TelaPrincipal extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      displayResult: false,
      searchResult: [],
      categoriesData: [],
      categoriesProducts: [],
    };
  }

  componentDidMount() {
    this.saveCategoriesInState();
  }

  saveCategoriesInState = async () => {
    const categoriesReturn = await getCategories();
    this.setState({ categoriesData: categoriesReturn });
  };

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
      searchResult: apiResponse.results,
      displayResult: true,
    });
  };

  showProductCategorie = async (event) => {
    const { id } = event.target;
    const apiResponse = await getProductsFromCategoryAndQuery(id);
    this.setState({ categoriesProducts: apiResponse.results });
  };

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
      price: item.price,
      title: item.title,
      img: item.thumbnail,
      quantity: 1,
    };
    this.saveCartItems(arrayofObject);
  };

  render() {
    const { searchInput,
      displayResult, searchResult, categoriesData, categoriesProducts } = this.state;
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
          && (
            <div
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </div>
          )}

        { displayResult
          ? (
            searchResult
              .map((item) => (
                <div key={ item.id } data-testid="product">
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                  <img src={ item.thumbnail } alt={ item.title } />
                  <button
                    type="button"
                    name={ item.id }
                    onClick={ () => this.CartAdd(item) }
                    data-testid="product-add-to-cart"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>

              ))

          )
          : (
            <div>
              <p>Nenhum produto foi encontrado</p>
            </div>)}
        { categoriesData.map((categoria, index) => (
          <label data-testid="category" key={ index } htmlFor={ categoria.id }>
            { categoria.name }
            <input
              type="radio"
              name=""
              id={ categoria.id }
              onClick={ this.showProductCategorie }
            />
          </label>
        )) }

        <Link
          data-testid="shopping-cart-button"
          to="/carrinhocompras"
        >
          Ir para Carrinho de Compras
        </Link>

        {
          categoriesProducts
            .map((item) => (
              <div key={ item.id } data-testid="product">
                <p>{item.title}</p>
                <p>{item.price}</p>
                <img src={ item.thumbnail } alt={ item.title } />
                <button
                  type="button"
                  name={ item.id }
                  onClick={ () => this.CartAdd(item) }
                  data-testid="product-add-to-cart"
                >
                  Adicionar ao carrinho
                </button>

                {/* <Link
                  to={ `/productdetails/${item.id}` }
                  data-testid="product-detail-link"
                  state={ { xablau: item } }
                >
                  <p>Ir para a página do produto</p>
                </Link> */}

                <Link
                  to={ {
                    pathname: `/productdetails/${item.id}`,
                    state: { item },
                  } }
                  data-testid="product-detail-link"
                >
                  {' '}
                  <p>Ir para a página do produto</p>
                </Link>
              </div>
            ))
        }
      </>
    );
  }
}

export default TelaPrincipal;
