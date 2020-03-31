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
const onMovieSelect = async (movieId) =>{
    const res = await axios.get("http://www.omdbapi.com/",{
        params:{
            apikey:KEY,
            i:movieId
        }
    })
    console.log(res.data)
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
         console.log(movies.length)
        if(!movies.length){
            dropdown.classList.remove('is-active')
            return;
        }
        resultsWrapper.innerHTML ='';

        dropdown.classList.add('is-active')
        for (let i in movies) {
            let movie = movies[i]
            //create an anchor for every movie 
            const option = document.createElement('a');
            const imgSrc = movie.Poster ==='N/A'?'':movie.Poster
            option.classList.add('dropdown-item')
            option.innerHTML = `
            <img src="${imgSrc}"/>
            ${movie.Title}
            `;
            //replace input value text with the selected movie Title
            option.addEventListener('click',async()=>{
                //close the dropdown
                dropdown.classList.remove('is-active')
                input.value = movie.Title
                const details = await onMovieSelect(movie.imdbID)
                
            })
            resultsWrapper.appendChild(option)
        }

    }

input.addEventListener('input', debounce(onInput, 500));


document.addEventListener('click',e =>{
    if(!root.contains(e.target)){
        dropdown.classList.remove('is-active')
    }
})