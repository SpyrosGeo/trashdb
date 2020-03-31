const KEY = "41101192";


const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
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
    const res = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: KEY,
            i: movieId
        }
    })
    return res.data
}
const root = document.querySelector('.autocomplete');

root.innerHTML = `
<label><b>Search For a Movie </b></label>
<input class="input" />
<div class="dropdown">
<div class="dropdown-menu">
<div class="dropdown-content results">

</div>
</div>
</div>
`;


const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results');

const onInput = async e => {

    const movies = await fetchData(e.target.value)
    if (!movies.length) {
        dropdown.classList.remove('is-active')
        return;
    }
    resultsWrapper.innerHTML = '';

    dropdown.classList.add('is-active')
    for (let i in movies) {
        let movie = movies[i]
        //create an anchor for every movie 
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster
        option.classList.add('dropdown-item')
        option.innerHTML = `
            <img src="${imgSrc}"/>
            ${movie.Title}
            `;
        //replace input value text with the selected movie Title
        option.addEventListener('click', async () => {
            //close the dropdown
            dropdown.classList.remove('is-active')
            input.value = movie.Title
            const details = await onMovieSelect(movie.imdbID)
            document.querySelector('#summary').innerHTML = movieTemplate(details)
        })
        resultsWrapper.appendChild(option)
    }

}

input.addEventListener('input', debounce(onInput, 500));


document.addEventListener('click', e => {
    if (!root.contains(e.target)) {
        dropdown.classList.remove('is-active')
    }
})


const movieTemplate = movieDetail => {
    const {Poster,Title,Genre,Plot} = movieDetail
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
    `
}