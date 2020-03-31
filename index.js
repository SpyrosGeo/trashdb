const KEY = "41101192";
const input = document.querySelector('input')
const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: KEY,
            s: searchTerm
        }
    });
    console.log(response.data)
}



//debounce 
const debounce = (func) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args)
        }, 1000)
    }
}


const onInput = debounce(e => {
    if(e.target.value){
        fetchData(e.target.value)
    }
})
input.addEventListener('input', onInput);