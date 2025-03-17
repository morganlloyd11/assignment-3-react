//IMPORTS
//axios for API request
import axios from "axios";

// base url and key
const api_key = "9b3cf789ced692a44e16a8bb2a542792";
const base_url = "https://api.themoviedb.org/3";

// fetch top rated movies
export const getTopMovies = async (page = 1) => {
    const res = await axios.get(`${base_url}/movie/top_rated`, {
        params: { api_key: api_key, page },
    });
    return res.data;
};

// fetch movie details by ID
export const getMovieDeets = async (movieId) => {
    const res = await axios.get(`${base_url}/movie/${movieId}`, {
        params: { api_key: api_key, append_to_response: "credits" },
    });
    return res.data;
};
