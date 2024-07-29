import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import "./App.css";
import FilmList from './components/FilmList';
import FilmHeader from './components/FilmHeader';
import SearchBar from './components/SearchBar';
import LikeButton from './components/LikeButton';
import RemoveButton from './components/RemoveButton';
import InfoButton from './components/InfoButton';
import SortButton from './components/SortButton';
import AddMovie from './components/AddMovie';
import FilterMovie from './components/FilterMovie';

function App() {
  // state za spremanje filmova
  const [films, setFilms] = useState([]);
  // state za searchanje
  const [searchedFilm, setSearchedFilm] = useState('');
  // state za likeane filmove
  const [liked, setLiked] = useState([]);

  // API request
  const getFilms = async () => {
    const apiURL = `http://www.omdbapi.com/?s=${searchedFilm}&apikey=745429`;
    const res = await fetch(apiURL);
    const resJSON = await res.json();
    if(resJSON.Search) {
      setFilms(resJSON.Search);
    }
  }

  // dodavanje novih lajkanih filmova
  const addLikedFilm = (film) => {
    if(!liked.includes(film)) {
      const newLiked = [...liked, film];
      setLiked(newLiked);
      saveLocally(newLiked);
    }
  }

  // micanje likeanih filmova
  const removeLikedFilm = (film) => {
    const newLiked = liked.filter((obj) => obj.imdbID !== film.imdbID);
    setLiked(newLiked);
    saveLocally(newLiked);
  }

  // sort search resulta
  const sortOnClick = (films) => {
    const sortedFilms = [...films];
    sortedFilms.sort((a, b) => a.Title.localeCompare(b.Title));
    setFilms(sortedFilms);
  }

  // dodaj novi film
  const addNewFilm = (film) => {
    film.preventDefault();
    const Title = film.target.Title.value;
    const Poster = film.target.Poster.value;
    const Year = film.target.Year.value;
    const imdbID = new Date().toLocaleTimeString();
    const Type = "movie";
    const newFilm = { Title, Year, imdbID, Type, Poster };
    console.log(newFilm);
    const newLiked = [...liked, newFilm];
    setLiked(newLiked);
    saveLocally(newLiked);
    film.target.reset();
  }

  // filtriranje
  const filterFilms = (film) => {
    film.preventDefault();
    var filteredFilms = [...films];
    const Year = film.target.Year.value;
    const Option = film.target.Option.value;
    if(Option === "before") {
      filteredFilms = filteredFilms.filter(item => item.Year < Year);
      setFilms(filteredFilms);
    }
    if(Option === "after") {
      filteredFilms = filteredFilms.filter(item => item.Year > Year);
      setFilms(filteredFilms);
    }
    film.target.reset();
  }

  // saveanje u localstorage
  const saveLocally = (array) => {
    localStorage.setItem('movie-app-local-storage', JSON.stringify(array));
  }

  // svaki put kad se searchedFilm promijeni, promijeni i films const
  useEffect(() => {
    getFilms(searchedFilm);
  }, [searchedFilm]);

  // na loadanje stranice
  useEffect(() => {
    const likedFilms = JSON.parse(localStorage.getItem('movie-app-local-storage'));
    if(likedFilms) {
      setLiked(likedFilms);
    }
  }, []);

  return (
    <div className='container-fluid film-app'>
      <div className='row align-items-center'>
        <div className='col-md-5'>
          <FilmHeader text='Search results'></FilmHeader>
        </div>
        <div className='col-md-1 sort-button justify-content-center d-flex' onClick={() => sortOnClick(films)}>
          <SortButton></SortButton>
        </div>
        <FilterMovie className='col-md-1 sort-button justify-content-center d-flex' handleSubmit={filterFilms}></FilterMovie>
        <div className='col-md-5'>
          <SearchBar searchedFilm={searchedFilm} setSearchedFilm={setSearchedFilm}></SearchBar>
        </div>
      </div>

      <div className='row list'>
        <FilmList films={films} likedOnClick={addLikedFilm} LikeButton={LikeButton} InfoButton={InfoButton}></FilmList>
      </div>
  
      <div className='row'>
        <div className='col-md-6'>
          <FilmHeader text='Your liked films...'></FilmHeader>
        </div>
        <div className='col-md-6'>
          <AddMovie handleSubmit={addNewFilm}></AddMovie>
        </div>
      </div>

      <div className='row list'>
        <FilmList films={liked} likedOnClick={removeLikedFilm} LikeButton={RemoveButton} InfoButton={InfoButton}></FilmList>
      </div>
    </div>
  );
}

export default App;