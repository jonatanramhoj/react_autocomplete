import React, { Component } from 'react';
import data from '../data';

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

    handleSearch = (searchText) => {
        const result = [];

        if (searchText.length === 0) {
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
        this.setState({ selectedText: selectedText.innerHTML });
    }

    updateValOnChange(selectedText) {
        this.setState({ selectedText: selectedText });
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
                    onKeyUp={(e) => this.handleSearch(e.target.value)}
                    onChange={(e) => this.updateValOnChange(e.target.value)}
                />
                {this.state.suggestions.length > 0 &&
                    <div className={`autocomplete__suggestions`}>
                        <div className="arrow-up"></div>
                        <div className="autocomplete__suggestions-inner">
                            <ul>
                                {this.state.suggestions.map((item) => {
                                    return (
                                        <li
                                            ref={(item) => { this.suggestedText = item; }}
                                            key={item}
                                            className="autocomplete__suggestions-item"
                                            onClick={(e) => this.updateValOnClick(e.target)}
                                        >
                                            {item}
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
