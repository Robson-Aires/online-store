import React, { Component } from 'react';

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
      </>
    );
  }
}

export default TelaPrincipal;
