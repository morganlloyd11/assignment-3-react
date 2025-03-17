// IMPORTS
// portal
import { createPortal } from "react-dom";
// CSS
import styles from "../styles/MoviePopup.module.css";

const MoviePopup = ({ movie, onClose }) => {
    // do not render if no movie is selected
    if (!movie) return null; 

    return createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            {/* prevent closing while clicking inside modal*/}
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {/* close btn */}
                <button className={styles.closeButton} onClick={onClose}>×</button>

                {/* movie img */}
                <img 
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                    alt={`${movie.title}`} 
                    className={styles.moviePoster}
                />

                {/* movie title & year released */}
                <h1>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>

                {/* rating */}
                <p>✨ {movie.vote_average}</p>

                {/* movie summary */}
                <p>{movie.overview}</p>

                {/* check if there are cast members before trying to render */}
                {movie.credits?.cast.length > 0 && (
                    <>
                        {/* cast list*/}
                        <h3>Starring:</h3>
                        <ul className={styles.castList}>
                            {movie.credits.cast.slice(0, 5).map((actor) => (
                                <li key={actor.id}>
                                    {actor.name} as {actor.character}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                
            </div>
        </div>,
        // render modal outside of react tree
        document.body
    );
};

export default MoviePopup;
