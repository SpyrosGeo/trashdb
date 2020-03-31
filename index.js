const KEY = "41101192";
const input = document.querySelector('input')
const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: KEY,
            s: searchTerm
        }
    });
    return (response.data.Search)
}






const onInput = async e => {
    if (e.target.value) {
        const movies = await fetchData(e.target.value)
        for(let i in movies){
            let movie = movies[i]
            console.log(movie.Poster)
            const div = document.createElement('div');
            div.innerHTML = `
            <img src="${movie.Poster}"/>
            <h1>${movie.Title}</h1>
            `;
            document.querySelector("#target").appendChild(div)
        }

    }
}
input.addEventListener('input', debounce(onInput, 500));