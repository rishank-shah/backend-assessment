const express = require("express");
const router = express.Router();

const { listMovies, createMovie, deleteMovie, updateMovie } = require("../controllers/movie");

const { authCheck } = require("../middlewares/authUser")

router.get("/list-movies", authCheck, listMovies);

router.post("/add-movie", authCheck, createMovie);

router.post("/update-movie", authCheck, updateMovie);

router.post("/delete-movie", authCheck, deleteMovie);

module.exports = router;
