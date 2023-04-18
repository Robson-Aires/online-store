import PropTypes from 'prop-types';
import React from 'react';

class RateProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      text: '',
      rating: '',
      storedReview: [],
      isInvalid: false,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    if (!localStorage.getItem(id)) {
      localStorage.setItem(id, JSON.stringify([]));
    }
    const saved = JSON.parse(localStorage.getItem(id));
    this.setState({ storedReview: saved });
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  saveRadioValue = (event) => {
    const e = event.target.value;
    this.setState({ rating: e });
  };

  verifyInfo = () => {
    const { id } = this.props;

    if (!localStorage.getItem(id)) {
      localStorage.setItem(id, JSON.stringify([]));
    }

    const saved = JSON.parse(localStorage.getItem(id));

    const { email, text, rating } = this.state;

    // const verifyInput = text.length > 0;

    const condition = /^\S+@\S+\.\S+$/;
    // regex extraído do tópico no link: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript do Stackoverflow

    if (!email.match(condition) || !rating) {
      this.setState({ isInvalid: true });
    } else {
      this.setState({ storedReview: saved,
        isInvalid: false,
        email: '',
        text: '',
        rating: '' });

      const completeReview = {
        email,
        text,
        rating,
      };

      saved.push(completeReview);

      localStorage.setItem(id, JSON.stringify(saved));
    }
  };

  render() {
    const { email, text, isInvalid, rating, storedReview } = this.state;

    return (
      <>
        <fieldset>
          <div>
            <input
              type="text"
              data-testid="product-detail-email"
              name="email"
              placeholder="Insira seu e-mail"
              value={ email }
              onChange={ this.onInputChange }
              required
            />
          </div>
          <div>
            <textarea
              data-testid="product-detail-evaluation"
              placeholder="Insira aqui sua avaliação"
              name="text"
              cols="40"
              rows="5"
              value={ text }
              onChange={ this.onInputChange }
            />
          </div>
          <div required>
            <label htmlFor="one">
              1
              <input
                id="one"
                data-testid="1-rating"
                type="radio"
                name="rating"
                value="1"
                checked={ rating === '1' }
                onChange={ this.saveRadioValue }

              />
            </label>
            <label htmlFor="two">
              2
              <input
                data-testid="2-rating"
                id="two"
                type="radio"
                name="rating"
                onChange={ this.saveRadioValue }
                checked={ rating === '2' }
                value="2"

              />
            </label>
            <label htmlFor="three">
              3
              <input
                data-testid="3-rating"
                id="three"
                type="radio"
                name="rating"
                checked={ rating === '3' }
                onChange={ this.saveRadioValue }
                value="3"

              />
            </label>
            <label htmlFor="four">
              4
              <input
                data-testid="4-rating"
                id="four"
                type="radio"
                name="rating"
                checked={ rating === '4' }
                onChange={ this.saveRadioValue }
                value="4"

              />
            </label>
            <label htmlFor="five">
              5
              <input
                data-testid="5-rating"
                id="five"
                type="radio"
                name="rating"
                checked={ rating === '5' }
                onChange={ this.saveRadioValue }
                value="5"

              />
            </label>
          </div>
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.verifyInfo }
          >
            Enviar
          </button>

          {isInvalid
        && (
          <p data-testid="error-msg">
            Campos inválidos
          </p>
        )}

        </fieldset>

        <h3>Avaliações do produto</h3>
        {storedReview.map((item) => (
          <div key={ Math.random() }>
            <p data-testid="review-card-email">
              {item.email}
            </p>
            <p data-testid="review-card-rating">
              {item.rating}
            </p>
            <p data-testid="review-card-evaluation">
              {item.text}
            </p>
          </div>
        ))}
      </>
    );
  }
}

RateProduct.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default RateProduct;
