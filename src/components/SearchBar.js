import React from 'react';

const SearchBar = (props) => {
    return(
        <div className='search'>
            <input className='form-control' placeholder='Search films...'
            value={props.searchedFilm}
            onChange={(typeEvent) => props.setSearchedFilm(typeEvent.target.value)}
            ></input>
        </div>
    );
}

export default SearchBar;