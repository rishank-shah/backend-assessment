const Joi = require('joi');
const models = require("../models")

const listMovies = async (req, res) => {
    try{
        const movies = await models.movie.findAndCountAll({
            where:{
                user_id: req.user.id
            }
        })
        return res.json({
            success: true,
            data: movies,
            message: "Movies Fetched"
        })
    }catch(err){
        return res.status(400).json({
            error: true,
            data: err,
            message: "Something went wrong"
        })
    }
}

const createMovieSchema = Joi.object({
    movie_name: Joi.string().required(),
    rating: Joi.number().integer().required(),
    cast: Joi.array().min(1).items(Joi.string()).required(),
    genre: Joi.string().required(),
    release_date: Joi.string().required(),
});

const createMovie = async (req, res) => {
    try{
        const release_date = Date.parse(req.body.release_date)

        if(isNaN(release_date)){
            return res.status(400).json({
                error: true,
                message: "Please enter release date in correct format",
                data: null,
            })
        }
        
        const value = await createMovieSchema.validateAsync({
            movie_name : req.body.movie_name,
            rating : req.body.rating,
            cast : req.body.cast,
            genre : req.body.genre,
            release_date : req.body.release_date,
        })
        const [movie, created] = await models.movie.findOrCreate({
            where: {
                user_id : req.user.id,
                movie_name : value.movie_name,
                rating : value.rating,
                genre : value.genre,
                release_date : new Date(value.release_date).toISOString(),
            },
            defaults: {
                movie_name : value.movie_name,
                rating : value.rating,
                cast : value.cast,
                genre : value.genre,
                release_date : new Date(value.release_date).toISOString(),
                user_id : req.user.id,
            },
        });
    
        if (!created) {
            return res.status(400).json({
                message: "Movie already exists",
                error: true,
            })
        }
    
        return res.status(201).json({
            success: true,
            message: "Movie added",
            data: movie,
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            error: true,
            message: "Please enter all information correctly",
            data: err,
        })
    }
}

const deleteMovie = async (req, res) => {
    try{
        const movie_id = parseInt(req.body.movie_id)

        if(isNaN(movie_id)){
            return res.status(400).json({
                error: true,
                message: "Please give a valid movie id",
                data: null,
            })
        }

        const movie = await models.movie.destroy({
            where: {
                user_id : req.user.id,
                id: movie_id,
            },
        });
    
        return res.json({
            success: true,
            message: "Movie deleted",
            data: movie,
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            error: true,
            message: "Something went wrong",
            data: err,
        })
    }
}

const updateMovie = async (req, res) => {
    try{
        const release_date = Date.parse(req.body.release_date)
        const movie_id = parseInt(req.body.movie_id)

        if(isNaN(movie_id)){
            return res.status(400).json({
                error: true,
                message: "Please give a valid movie id",
                data: null,
            })
        }

        if(isNaN(release_date)){
            return res.status(400).json({
                error: true,
                message: "Please enter release date in correct format",
                data: null,
            })
        }
        
        const value = await createMovieSchema.validateAsync({
            movie_name : req.body.movie_name,
            rating : req.body.rating,
            cast : req.body.cast,
            genre : req.body.genre,
            release_date : req.body.release_date,
        })
        const movie = await models.movie.update(
            {
                movie_name : value.movie_name,
                rating : value.rating,
                cast : value.cast,
                genre : value.genre,
                release_date : new Date(value.release_date).toISOString(),
            },
            {
                where: {
                    user_id : req.user.id,
                    id: movie_id,
                }
            }
        );
    
        return res.status(201).json({
            success: true,
            message: "Movie updated",
            data: movie,
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            error: true,
            message: "Please enter all information correctly",
            data: err,
        })
    }
}

module.exports = {
    listMovies,
    createMovie,
    deleteMovie,
    updateMovie,
}