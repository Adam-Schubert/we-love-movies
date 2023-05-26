const theatersService = require("./theaters.service");
const asyncError = require("../errors/asyncError");

async function list(req, res, next) {
    const { movieId } = req.params;
    if (movieId) {
        const theaters = await theatersService.listForMovies();
        const data = theaters.filter(movieId ? theater => theater.movie_id === Number(movieId) : () => true);
        res.json({ data });
    } else {
        const theaters = await theatersService.listTheaters();
        for (let theater of theaters) {
            const moviesArr = await theatersService.getMoviesForTheater(theater.theater_id);
            theater["movies"] = moviesArr[0].movies;
        }
        res.json({ data: theaters });
    }
    
}

module.exports = {
    list: asyncError(list),
}