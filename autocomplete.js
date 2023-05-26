const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
  <label><b>Search</b></label>
  <input class='input' />
  <div class='dropdown'>
    <div class='dropdown-menu'>
      <div class='dropdown-content results'></div>
    </div>
  </div>
`;

  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");
  const input = root.querySelector("input");

  const onInput = async (event) => {
    // if (timeOut) {
    //   clearTimeout(timeOut); //if user wait 1 sec search fn work.
    // }
    // timeOut = setTimeout(() => {
    const items = await fetchData(event.target.value); //we get input data from searchTerm above
    //remove menu
    if (!items.length) {
      dropdown.classList.remove("is-active");
    }

    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    for (let item of items) {
      const optin = document.createElement("a");

      optin.classList.add("dropdown-item"); //add class
      optin.innerHTML = renderOption(item);

      optin.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });
      resultsWrapper.appendChild(optin);
    }
  };
  input.addEventListener("input", debounce(onInput, 500));
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
