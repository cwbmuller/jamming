import React, { Component } from 'react';
import './SearchBar.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const savedTerm = cookies.get('searchTerm');
let defaultTerm = '';
if (savedTerm) {
    defaultTerm = savedTerm;
    cookies.remove('searchTerm');
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        if (defaultTerm !== '') {
            this.setState({term: defaultTerm});
            this.props.onSearch(defaultTerm);
        }
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
            <input onChange={this.handleTermChange} defaultValue={defaultTerm} placeholder="Enter A Song, Album, or Artist" />
            <a onClick={this.search}>SEARCH</a>
        </div>
    );
  }
}

export default SearchBar;