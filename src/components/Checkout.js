import PropTypes from 'prop-types';
import React from 'react';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      storedItems: [],
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      payment: '',
      isInvalid: false,
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

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  saveRadioValue = (event) => {
    const e = event.target.value;
    this.setState({ payment: e });
  };

  validateAndSubmit = () => {
    const { fullName, email, cpf, phone, cep, address, payment } = this.state;
    const { history } = this.props;
    const cpfAndPhoneLength = 11;
    const cepLength = 8;

    const verifyInput = fullName.length > 0
    && cpf.length === cpfAndPhoneLength
    && phone.length === cpfAndPhoneLength
    && cep.length === cepLength
    && address.length > 0;

    const condition = /^\S+@\S+\.\S+$/;
    // regex extraído do tópico no link: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript do Stackoverflow

    if (!email.match(condition) || !payment || !verifyInput) {
      this.setState({ isInvalid: true });
    } else {
      this.setState({
        fullName: '',
        email: '',
        cpf: '',
        phone: '',
        cep: '',
        address: '',
        payment: '',
        isInvalid: false });

      localStorage.removeItem('cartItems');
      history.push('/');
    }
  };

  render() {
    const {
      fullName, email, cpf, phone, cep, address, payment, isInvalid, storedItems,
    } = this.state;
    return (
      <div>
        {storedItems.length > 0 && (
          <div>
            <p>Checkout</p>
            { storedItems.map((produto, index) => (
              <div key={ index }>
                <div data-testid="shopping-cart-product-name">{produto.title}</div>
                <div data-testid="shopping-cart-product-quantity">{produto.quantity}</div>
                <div>{produto.price}</div>
                <img src={ produto.img } alt={ produto.title } />
              </div>
            ))}
            <fieldset>
              <label htmlFor="name">
                Nome completo
                <input
                  data-testid="checkout-fullname"
                  type="text"
                  name="fullName"
                  value={ fullName }
                  placeholder="Insira aqui seu nome completo"
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="email">
                E-mail
                <input
                  data-testid="checkout-email"
                  type="text"
                  name="email"
                  value={ email }
                  placeholder="Insira aqui seu e-mail"
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="cpf">
                CPF
                <input
                  data-testid="checkout-cpf"
                  type="text"
                  name="cpf"
                  value={ cpf }
                  maxLength="11"
                  placeholder="Insira aqui seu CPF sem pontos ou traços"
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="phone">
                Telefone/celular para contato
                <input
                  data-testid="checkout-phone"
                  type="text"
                  name="phone"
                  value={ phone }
                  maxLength="11"
                  placeholder="Insira aqui seu número com DDD"
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="cep">
                CEP
                <input
                  data-testid="checkout-cep"
                  type="text"
                  name="cep"
                  value={ cep }
                  maxLength="8"
                  placeholder="Insira aqui o CEP de sua residência"
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="address">
                Endereço
                <input
                  data-testid="checkout-address"
                  type="text"
                  name="address"
                  value={ address }
                  placeholder="Insira aqui seu endereço completo"
                  onChange={ this.onInputChange }
                />
              </label>
              <p>Método de pagamento</p>
              <label htmlFor="Boleto">
                Boleto
                <input
                  id="Boleto"
                  data-testid="ticket-payment"
                  type="radio"
                  name="payment"
                  value="Boleto"
                  checked={ payment === 'Boleto' }
                  onChange={ this.saveRadioValue }
                />
              </label>
              <label htmlFor="Visa">
                Visa
                <input
                  id="Visa"
                  data-testid="visa-payment"
                  type="radio"
                  name="payment"
                  value="Visa"
                  checked={ payment === 'Visa' }
                  onChange={ this.saveRadioValue }

                />
              </label>
              <label htmlFor="Master">
                Master
                <input
                  id="Master"
                  data-testid="master-payment"
                  type="radio"
                  name="payment"
                  value="Master"
                  checked={ payment === 'Master' }
                  onChange={ this.saveRadioValue }

                />
              </label>
              <label htmlFor="Elo">
                Elo
                <input
                  id="Elo"
                  data-testid="elo-payment"
                  type="radio"
                  name="Elo"
                  value="Elo"
                  checked={ payment === 'Elo' }
                  onChange={ this.saveRadioValue }

                />
              </label>

              <div>
                <button
                  type="button"
                  data-testid="checkout-btn"
                  onClick={ this.validateAndSubmit }
                >
                  Finalizar compra
                </button>
              </div>
              {isInvalid
        && (
          <p data-testid="error-msg">
            Campos inválidos
          </p>
        )}

            </fieldset>
          </div>
        )}
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Checkout;
