import React, { Component } from 'react';
import { getCategories } from '../services/api';

class TelaPrincipal extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      categoriesData: [],
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

  render() {
    const { searchInput, categoriesData } = this.state;
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

        { categoriesData.map((categoria, index) => (
          <label data-testid="category" key={ index } htmlFor={ categoria.id }>
            { categoria.name }
            <input type="radio" name="" id={ categoria.id } />
          </label>
        )) }

        {/* <button type="button"> hello </button> */}
      </>
    );
  }
}

export default TelaPrincipal;
