import React, { Component } from 'react';
import data from '../data/data';

let quickSearchTimeout;

class AutoComplete extends Component {
    constructor() {
        super();

        this.state = {
            suggestions: [],
            selectedText: ''
        }
    }

    componentDidMount() {
        this.searchInput.focus();
    }

    componentWillMount() {
        document.addEventListener('keydown', this.handleEscape.bind(this));
        document.addEventListener('keydown', this.handleArrowKeys.bind(this));
    }

    handleEscape(e) {
        if (e.keyCode === 27) {
            this.setState({ suggestions: [] });
        }
    }

    handleSearch = (e) => {
        const searchText = e.target.value;
        const result = [];

        if (searchText.length === 0 || e.keyCode === 27) {
            this.setState({ suggestions: [] });
            return;
        }

        quickSearchTimeout = setTimeout(() => {

            clearTimeout(quickSearchTimeout);

            // This could be the result of an ajax request
            for (const item of data) {
                if (searchText.toLowerCase() === item.slice(0, searchText.length).toLowerCase()) {
                    result.push(item);
                }
            }

            this.setState({
                suggestions: result.slice(0, 10) // Limit result to 10
            });

        }, 0);
    };

    updateValOnClick(selectedText) {
        this.setState({
            selectedText: selectedText.innerHTML,
            suggestions: []
        });
    }

    updateValOnChange(selectedText) {
        this.setState({ selectedText: selectedText, tempVal: selectedText });
    }

    handleArrowKeys(e) {
        if (this.state.suggestions.length === 0) {
            return;
        }
        const list = this.suggestionsList;
        const first = list.firstChild;
        const last = list.lastChild;
        const input = this.searchInput;

        switch (e.keyCode) {
            // Arrow down
            case 40:
                if (document.activeElement === input) {
                    first.focus();
                    this.setState({ selectedText: first.firstChild.innerHTML })
                } else if (document.activeElement.nextElementSibling !== null) {
                    const next = document.activeElement.nextElementSibling;
                    next.focus();
                    this.setState({ selectedText: next.firstChild.innerHTML })
                } else if (document.activeElement === last) {
                    input.focus();
                    this.setState({ selectedText: this.state.tempVal })
                }
                break;
            // Arrow up    
            case 38:
                if (document.activeElement === first) {
                    input.focus();
                    this.setState({ selectedText: this.state.tempVal })
                } else if (document.activeElement === input)
                    last.focus();
                else {
                    const previous = document.activeElement.previousElementSibling;
                    previous.focus();
                    this.setState({ selectedText: previous.firstChild.innerHTML })
                }
                break;
            // Enter
            case 13:
                if (document.activeElement === input) {
                    break;
                } else {
                    this.setState({ selectedText: document.activeElement.firstChild.innerHTML, suggestions: [] });
                }
        }

    }

    render() {
        return (
            <div className="autocomplete">
                <input
                    ref={(input) => { this.searchInput = input; }}
                    type="text"
                    className="autocomplete__input"
                    placeholder="Search for a country"
                    value={this.state.selectedText}
                    onKeyUp={(e) => this.handleSearch(e)}
                    onChange={(e) => this.updateValOnChange(e.target.value)}
                />
                {this.state.suggestions.length > 0 &&
                    <div className="autocomplete__suggestions">
                        <div className="arrow-up"></div>
                        <div className="autocomplete__suggestions-inner">
                            <ul ref={(list) => { this.suggestionsList = list; }}>
                                {this.state.suggestions.map((item) => {
                                    return (
                                        <li
                                            ref={(item) => { this.suggestedText = item; }}
                                            key={item}
                                            className="autocomplete__suggestions-item"
                                            onClick={(e) => this.updateValOnClick(e.target)}
                                            tabIndex="1"
                                        >
                                            <a className="autocomplete__suggestions-link">{item}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default AutoComplete;
