import { useEffect, useState } from 'react';
import './App.css';
import searchIcon from './search.svg'
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com/?apikey=3cbc099c&';

function App() {
  //for each movie component
  const [movies,setMovies] = useState([]);

  //for search
  const [searchTerm,setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();

    setMovies(data.Search)
  }

  //call the useEffect
  useEffect(() => {
    searchMovies('Avengers')
  }, [])
  return (
    <div className="App">
      <h1>MovieLand</h1>

      <div className='search'>
        <input
          placeholder='Search for a movie'
          value={searchTerm}
          onChange= {(e) => setSearchTerm(e.target.value)}
        />
        <img 
        src={searchIcon}
        alt='search'
        onClick={() => searchMovies(searchTerm)}
        />
      </div>
{
  movies?.length > 0
  ? (
    <div className='container'>
      {movies.map((movie) => (
        <MovieCard movie = {movie}/>
      ))}
    </div>
  ) : (
    <div className='empty'>
      <h2>No movies</h2>
    </div>
  )
  
}

    </div>
  );
}

export default App;
