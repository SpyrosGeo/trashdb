const KEY = "41101192";


const fetchData = async (searchTerm) => {
    const response = await axios.get("https://www.omdbapi.com/", {
        params: {
            apikey: KEY,
            s: searchTerm
        }
    });
    if (response.data.Error) {
        return [];
    }
    return (response.data.Search)
}
const onMovieSelect = async (movieId) => {
    const res = await axios.get("https://www.omdbapi.com/", {
        params: {
            apikey: KEY,
            i: movieId
        }
    })
    return res.data
}




createAutoComplete({
    root: document.querySelector('.autocomplete'),
    renderOption: (movie) =>{
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}"/>
            ${movie.Title}
            `

    },
   
})




const movieTemplate = movieDetail => {
    console.log(movieDetail)
    const {Poster,Title,Genre,Plot,Awards,BoxOffice,imdbRating,imdbVotes} = movieDetail
    return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
        <img src="${Poster}">
        </p>
      </figure>
      <div class="media-content">
      <div class="content">
        <h1>${Title}</h1>
        <h4>${Genre}</h4>
        <p>${Plot}</p>
      </div>
      </div>
    </article>
    <article class="notification is-warning">
    <p class="title">${Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-warning">
    <p class="title">${BoxOffice}</p>
    <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-warning">
    <p class="title">${imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-warning">
    <p class="title">${imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
    </article>
    `
}