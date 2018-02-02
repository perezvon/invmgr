import React from 'react'
import Autosuggest from 'react-autosuggest'
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
export default class ProductAutosuggest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };
  }

  escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions = (value) => {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === '' || escapedValue.length < 3) {
      return [];
    }

    const regex = new RegExp(escapedValue, 'i');

    return this.props.products.filter(product => regex.test(product.name) || regex.test(product.productId));
  }

  getSuggestionValue = (suggestion) => {
    console.log(suggestion)
    this.props.handleMasterStateUpdate(suggestion, 'product');
    return suggestion.productId;
  }

  renderSuggestion = (suggestion) => {
    return (
      <span>{suggestion.productId} — {suggestion.name}</span>
    );
  }

  renderInputComponent = inputProps => (
    <FormGroup>
      <ControlLabel>Product # </ControlLabel>
      <FormControl
      type='text'
      name='productId'
      {...inputProps}
      />
    </FormGroup>
  );

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const theme = {
  container: {
    position: 'relative'
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 51,
    width: 280,
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type a product name...",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        renderInputComponent={this.renderInputComponent}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        theme={theme} />
    );
  }
}
