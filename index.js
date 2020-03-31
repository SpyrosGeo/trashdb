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






const onInput = e => {
    if(e.target.value){
        fetchData(e.target.value)
    }
}
input.addEventListener('input', debounce(onInput,500));