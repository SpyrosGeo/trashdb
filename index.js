const KEY = "41101192";
const input = document.querySelector('input')
const fetchData = async(searchTerm)=>{
    const response = await axios.get("http://www.omdbapi.com/",{
        params:{
            apikey:KEY,
            s:searchTerm
        }
        });
    console.log(response.data)
}

//debounce api requests for every value on input
let timeoutId;
const onInput = e =>{
    if(timeoutId){
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(()=>{
        fetchData(e.target.value)

    },1000)
}
input.addEventListener('input',onInput);