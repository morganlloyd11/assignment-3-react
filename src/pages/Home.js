// IMPORTS
// state and useEffect
import { useState, useEffect } from "react";
// movie api functions
import { getTopMovies, getMovieDeets } from "../movieAPI";
// movie pop-up modal
import MoviePopup from "../components/MoviePopup";
// CSS
import styles from "../styles/Home.module.css";

const Home = () => {
    // movie state stores the current list of movies
    const [movies, setMovies] = useState([]);
    // chosen movie state stores the selected movie details
    const [chosenMovie, setChosenMovie] = useState(null);
    // page state tracks page number
    const [page, setPage] = useState(1);
    // search state stores user search input
    const [searchTerm, setSearchTerm] = useState("");

    // fetches movies when the page changes
    useEffect(() => {
        const getMovies = async () => {
            try {
                // call api to get movies for current page
                const data = await getTopMovies(page);
                // update state with movie results
                setMovies(data.results);
            } catch (error) {
                // display error if something goes wrong
                console.error("could not fetch movies :(", error);
            }
        };

        // call function when page changes or loads
        getMovies(); 
        // dependent on page useEffect runs on page change
    }, [page]);

    // function to get details of a clicked movie
    const handleMovieClick = async (movieId) => {
        try {
            // call API for movie details 
            const data = await getMovieDeets(movieId);
            // update state with chosen movie details
            setChosenMovie(data);
        } catch (error) {
            console.error("could not get movie details :(", error);
        }
    };

    // filter movies based on search input
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1>🌟 TOP MOVIES 🌟</h1>

            {/* search bar lets users search by movie title */}
            <input 
                type="text" 
                placeholder="search movies here :)" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className={styles.searchBar}
            />

            {/* check if movies exist before showing */}
            {filteredMovies.length > 0 ? (
                <ul className={styles.movieList}>
                    {/* map through list of movies and for each movie show a list item that has movie img and info */}
                    {filteredMovies.map((movie) => (
                        <li 
                            // key for each movie in the list
                            key={movie.id} 
                            className={styles.movieItem} 
                            // get movie details on click
                            onClick={() => handleMovieClick(movie.id)} 
                        >
                            {/* movie poster */}
                            <img 
                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} 
                                alt={`${movie.title} poster`} 
                                className={styles.moviePoster}
                            />
                            {/*title and year it was released*/}
                            <h3>{movie.title} ({new Date(movie.release_date).getFullYear()})</h3>
                            
                            {/*rating*/}
                            <p>✨ {movie.vote_average}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                // message when no movies match search
                <p className={styles.noResults}>no movies found :(</p>
            )}

            {/* pagination allows users to click between pages */}    
            <div className={styles.pagination}>
                {/* back btn hidden on first page*/}
                <button 
                    // updates page num by decreasing by 1
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    // button disables when on first page
                    disabled={page === 1}
                >
                    Back
                </button>
                
                {/*shows the current page*/}
                <span>PAGE {page}</span>
                
                {/* next btn updates page number by increasing by 1 */}
                <button onClick={() => setPage((p) => p + 1)}>
                    Next
                </button>
            </div>

            {/* movie popup modal has details of chosen movie */}
            {chosenMovie && (
                <MoviePopup 
                    // pass movie data to modal
                    movie={chosenMovie}
                    // close modal when user clicks outside
                    onClose={() => setChosenMovie(null)}
                />
            )}
        </div>
    );
};

export default Home;
