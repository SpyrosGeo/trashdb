const createAutoComplete = ({
    root,
    renderOption,
    onOptionSelect,
    inputValue,
    fetchData }) => {
    root.innerHTML = `
<label><b>Search</b></label>
<input class="input" />
<div class="dropdown">
<div class="dropdown-menu">
<div class="dropdown-content results">

</div>
</div>
</div>
`;


    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown')
    const resultsWrapper = root.querySelector('.results');

    const onInput = async e => {

        const items = await fetchData(e.target.value)
        if (!items.length) {
            dropdown.classList.remove('is-active')
            return;
        }
        resultsWrapper.innerHTML = '';

        dropdown.classList.add('is-active')
        for (let i in items) {
            let item = items[i]
            //create an anchor for every item 
            const option = document.createElement('a');
            option.classList.add('dropdown-item')
            option.innerHTML = renderOption(item);
            //replace input value text with the selected item Title
            option.addEventListener('click', async () => {
                //close the dropdown
                dropdown.classList.remove('is-active')
                input.value = inputValue(item)
                onOptionSelect(item)
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


}