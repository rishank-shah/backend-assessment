import instance from "./axiosConfig";

export const getAllMovies = async () =>
    await instance.get(`/list-movies`)

export const deleteMovie = async (movie_id) =>
    await instance.post('/delete-movie', { movie_id })

export const updateMovie = async ({
    release_date,
    movie_name,
    rating,
    cast,
    genre,
    movie_id,
}) =>
    await instance.post('/update-movie', {
        release_date,
        movie_name,
        rating,
        cast,
        genre,
        movie_id,
    })

export const addMovie = async ({
    release_date,
    movie_name,
    rating,
    cast,
    genre,
}) =>
    await instance.post('/add-movie', {
        release_date,
        movie_name,
        rating,
        cast,
        genre,
    })