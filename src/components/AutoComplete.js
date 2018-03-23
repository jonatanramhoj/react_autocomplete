import React, { Component } from 'react';
import data from '../data';

let quickSearchTimeout;

class AutoComplete extends Component {
    constructor() {
        super();

        this.state = {
            suggestions: [],
            selectedText: '',
            activeIndex: null,
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
        e.persist(); // Allows us to access the event properties in an asyncronous way
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
        this.setState({ selectedText: selectedText });
    }

    handleArrowKeys(e) {
        if (this.state.suggestions.length === 0) {
            return;
        }
        const list = this.suggestionsList;
        const first = list.firstChild;
        const input = this.searchInput;

        // switch (e.keyCode) {
        //     // Arrow down
        //     case 40:
        //         if (document.activeElement === input) {
        //             first.focus();
        //             this.setState({ selectedText: first.innerHTML })
        //         } else if (document.activeElement.nextElementSibling !== null) {
        //             const next = document.activeElement.nextElementSibling;
        //             next.focus();
        //             this.setState({ selectedText: next.innerHTML })
        //         }
        //         break;
        //     // Arrow up    
        //     case 38:
        //         if (document.activeElement === first) {
        //             input.focus();
        //         } else if (document.activeElement === input)
        //             break;
        //         else {
        //             const previous = document.activeElement.previousElementSibling;
        //             previous.focus();
        //             this.setState({ selectedText: previous.innerHTML })
        //         }
        // }

        switch (e.keyCode) {
            case 40: 
                if (this.state.activeIndex === null) {
                    console.log('first', first.dataset.index);
                    this.setState({activeIndex: first.dataset.index}, () => {
                        first.classList.add('active');
                    });
                } else {
                    console.log('else...');
                }
        }

    }

    setActive(index) {
        const active = this.state.activeIndex === index ? 'active' : '';
        return active;
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
                    <div className={`autocomplete__suggestions`}>
                        <div className="arrow-up"></div>
                        <div className="autocomplete__suggestions-inner">
                            <ul ref={(list) => { this.suggestionsList = list; }}>
                                {this.state.suggestions.map((item, index) => {
                                    const active = this.setActive(index);
                                    return (
                                        <li
                                            ref={(item) => { this.suggestedText = item; }}
                                            key={item}
                                            className={`autocomplete__suggestions-item ${active}`}
                                            onClick={(e) => this.updateValOnClick(e.target)}
                                            tabIndex="1"
                                            data-index={index}
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
