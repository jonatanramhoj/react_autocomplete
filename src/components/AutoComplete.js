import React, { Component } from "react";
import data from "../data/data";

let currentFocus;
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
    document.addEventListener("keyup", this.handleEscape);
    document.addEventListener("keydown", this.handleNavigation);
  }

  handleSearch = e => {
    const searchString = e.target.value;
    const result = [];
    currentFocus = -1;

    // This could be the result of an ajax request
    for (const item of data) {
      if (
        searchString.toLowerCase() ===
        item.slice(0, searchString.length).toLowerCase()
      ) {
        const strong = React.createElement(
          "strong",
          null,
          item.substr(0, searchString.length)
        );
        const span = React.createElement(
          "span",
          null,
          item.substr(searchString.length)
        );
        const input = React.createElement("input", {
          type: "hidden",
          value: item
        });
        const div = React.createElement("div", null, strong, span, input);
        result.push(div);
      }
    }

    this.setState({
      suggestions: result.slice(0, 8), // Limit result
      selectedText: searchString
    });

    // clear suggestions if input field is empty
    if (searchString.length === 0) {
      this.setState({ suggestions: [] });
    }
  };

  handleNavigation = e => {
    const items = document.querySelectorAll(".results-item");

    // arrow down
    if (e.keyCode === 40) {
      currentFocus++;
      this.addActive(items);
      // arrow up
    } else if (e.keyCode === 38) {
      currentFocus--;
      this.addActive(items);
      // enter
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus > -1 && items.length) {
        this.setState({
          selectedText: document.querySelector(".active").querySelector("input")
            .value,
          suggestions: []
        });
      }
    }
  };

  addActive = items => {
    if (!items.length) {
      return;
    }

    this.removeActive(items);

    if (currentFocus >= items.length) {
      currentFocus = 0;
    }

    if (currentFocus < 0) {
      currentFocus = items.length - 1;
    }

    items[currentFocus].classList.add("active");
  };

  removeActive = items => {
    items.forEach(item => {
      item.classList.remove("active");
    });
  };

  handleEscape = e => {
    if (e.keyCode === 27) {
      this.setState({ suggestions: [] });
    }
  };

  updateValOnClick = e => {
    const selected = e.currentTarget.querySelector("input").value;
    this.setState({ selectedText: selected, suggestions: [] });
  };

  render() {
    return (
      <form className="autocomplete" autoComplete="off">
        <input
          ref={input => (this.searchInput = input)}
          type="text"
          className="input"
          placeholder="Search for a country"
          value={this.state.selectedText}
          onChange={this.handleSearch}
        />

        {this.state.suggestions.length > 0 && (
          <div className="results">
            <div className="arrow-up" />
            <div className="results-inner">
              <ul ref={this.list}>
                {this.state.suggestions.map((item, index) => {
                  return (
                    <li
                      ref={this.listItem}
                      key={index}
                      className="results-item"
                      onClick={this.updateValOnClick}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        <div className="info">
          <p>
            React Autocomplete with keyboard navigation.
            <br className="desktop" /> Type something and use the arrows to
            navigate, press enter to select.
          </p>
        </div>
      </form>
    );
  }
}

export default AutoComplete;
