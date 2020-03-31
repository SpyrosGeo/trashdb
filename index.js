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
    if (e.target.value) {
        const movies = await fetchData(e.target.value)
         
        resultsWrapper.innerHTML ='';
        dropdown.classList.add('is-active')
        for (let i in movies) {
            let movie = movies[i]
            const option = document.createElement('a');
            const imgSrc = movie.Poster ==='N/A'?'':movie.Poster
            option.classList.add('dropdown-item')
            option.innerHTML = `
            <img src="${imgSrc}"/>
            ${movie.Title}
            `;
            resultsWrapper.appendChild(option)
        }

    }
}
input.addEventListener('input', debounce(onInput, 500));