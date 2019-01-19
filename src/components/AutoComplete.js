import React, { Component } from "react";
import data from "../data/data";

class AutoComplete extends Component {
  constructor() {
    super();

    this.state = {
      suggestions: [],
      selectedText: ""
    };

    this.list = React.createRef();
    this.listItem = React.createRef();
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleEscape.bind(this));
  }

  handleEscape = e => {
    if (e.keyCode === 27) {
      this.setState({ suggestions: [] });
    }
  };

  handleSearch = e => {
    const searchString = e.target.value;
    const result = [];

    // This could be the result of an ajax request
    for (const item of data) {
      if (
        searchString.toLowerCase() ===
        item.slice(0, searchString.length).toLowerCase()
      ) {
        result.push(item);
      }
    }

    this.setState({
      suggestions: result.slice(0, 10), // Limit result to 10
      selectedText: searchString
    });

    // clear suggestions if input field is empty
    if (searchString.length === 0) {
      this.setState({ suggestions: [] });
    }
  };

  updateValOnClick = e => {
    this.setState({ selectedText: e.target.innerText, suggestions: [] });
  };

  render() {
    return (
      <div className="autocomplete">
        <input
          ref={input => this.searchInput = input }
          type="text"
          className="autocomplete__input"
          placeholder="Search for a country"
          value={this.state.selectedText}
          onChange={this.handleSearch}
        />
        {this.state.suggestions.length > 0 && (
          <div className="autocomplete__suggestions">
            <div className="arrow-up" />
            <div className="autocomplete__suggestions-inner">
              <ul ref={this.list}>
                {this.state.suggestions.map(item => {
                  return (
                    <li
                      ref={this.listItem}
                      key={item}
                      className="autocomplete__suggestions-item"
                      onClick={this.updateValOnClick}
                      tabIndex="1"
                    >
                      <a className="autocomplete__suggestions-link">{item}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AutoComplete;
