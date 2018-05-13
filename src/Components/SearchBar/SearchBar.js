import React, { Component } from 'react';
import './SearchBar.css';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }
    search(e){
        this.props.onSearch(this.state.term);
        e.preventDefault();
    }
    handleTermChange(e) {
        this.setState({term: e.target.value});

    }
  render() {
    return (
        <div className="SearchBar">
            <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
            <a onClick={this.search}>SEARCH</a>
        </div>
    );
  }
}

export default SearchBar;