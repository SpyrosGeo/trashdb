const KEY = "41101192";



const autoCompleteConfig= {
    renderOption: (movie) => {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}"/>
            ${movie.Title} (${movie.Year})
            `;
    },
   
    inputValue(movie) {
        return movie.Title;
    },
    fetchData: async (searchTerm) => {
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
}

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect: async (movie) => {
        document.querySelector('.tutorial').classList.add('is-hidden')
        const details = await onMovieSelect(movie.imdbID,'left')
        document.querySelector('#left-summary').innerHTML = movieTemplate(details)
    },
    
})
createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect: async (movie) => {
        document.querySelector('.tutorial').classList.add('is-hidden')
        const details = await onMovieSelect(movie.imdbID,'right')
        document.querySelector('#right-summary').innerHTML = movieTemplate(details)
        console.log(details)
    },
    
})

let leftMovie;
let rightMovie;

const onMovieSelect = async (movieId,side) => {
    const res = await axios.get("https://www.omdbapi.com/", {
        params: {
            apikey: KEY,
            i: movieId
        }
    })
    //check if two movies are on screen to begin comparison
    if(side==='left'){
        leftMovie =res.data;

    }else{
        rightMovie = res.data;
    }

    if(leftMovie && rightMovie){
        runComparison()
    }

    return res.data
}

const runComparison =( )=>{
    console.log('Time for comparison')

}

let rottenScore='N/A'
const movieTemplate = movieDetail => {
    console.log(movieDetail)
    
    const {Poster,Title,Genre,Plot,Awards,BoxOffice,imdbRating,imdbVotes,Ratings} = movieDetail
    const {Value} = Ratings[1] || "N/A"
    if(Value==undefined){
        rottenScore ="N/A"
        console.log(Value)
    }else{
        rottenScore = Value
        
    }
    
    
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
    <p class="title">${rottenScore}</p>
    <p class="subtitle">Rotten Tomatos</p>
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