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

  handleEscape = e => {
    if (e.keyCode === 27) {
      this.setState({ suggestions: [] });
    }
  };

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
        result.push(item);
      }
    }

    this.setState({
      // suggestions: result.slice(0, 10), // Limit result to 10
      suggestions: result,
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

  handleNavigation = e => {
    const items = document.querySelectorAll("li");

    if (e.keyCode === 40) {
      currentFocus++;
      this.addActive(items);
      // scroll to element
    } else if (e.keyCode === 38) {
      currentFocus--;
      this.addActive(items);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      this.setState({
        suggestions: [],
        selectedText: document.querySelector(".active").innerHTML
      });
    }
  };

  addActive = items => {
    if (!items) {
      return false;
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

  render() {
    return (
      <div className="autocomplete">
        <input
          ref={input => (this.searchInput = input)}
          type="text"
          className="input"
          placeholder="Search for a country"
          value={this.state.selectedText}
          onChange={this.handleSearch}
        />

        {this.state.suggestions.length > 0 && (
          <div className="suggestions">
            <div className="arrow-up" />
            <div className="suggestions-inner">
              <ul ref={this.list}>
                {this.state.suggestions.map(item => {
                  return (
                    <li
                      ref={this.listItem}
                      key={item}
                      className="suggestions-item"
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
      </div>
    );
  }
}

export default AutoComplete;
