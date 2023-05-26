const moviesService = require("./movies.service");
const asyncError = require("../errors/asyncError");

async function list(req, res, next) {
    const is_showing = req.query.is_showing;
    //console.log(is_showing);
    const data = is_showing === "true" ? await moviesService.listShowingMovies() : await moviesService.list();
    res.json({ data });
}

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
        if (movie) {
          res.locals.movie = movie;
          return next();
        }
        next({ status: 404, message: `Movie cannot be found.`});
  }
async function read(req, res, next) {
    const { movieId } = req.params;
    res.json({ data: res.locals.movie });
}

module.exports = {
    list: asyncError(list),
    read: [asyncError(movieExists), read],
    movieExists: [asyncError(movieExists)],
};