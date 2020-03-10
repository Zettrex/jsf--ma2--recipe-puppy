//1. What is a component?
//a component is a element thats repeating over and over, like a item in a todo list.
//or where its repeating content.

//2. What is data binding?
//working with data compared to elements and making changes get saved as data to be displayed.

//3. What does array.map() do?
//goes trough an array and returns a new array with the changes done, with callback function.

//4. What are props?

//5. What does export default do?
//exports sets something as default

//6.

const rootDOM = document.querySelector("#root");

fetch("https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/")
  .then(response => response.json())
  .then(renderer);

function renderer(data) {
    const originalData = data;

    function createPage(data) {
        return `
            <h1>Recipe Puppy</h1>
            ${createSearch(data.results)}
            ${app(data)}
        `
    }

    function app(data) {
        return `
            <div class="recPupList listWrapper">
                ${createList(data.results)}
            </div>     
        `;
    }
    function createList(data) {
        console.log(data);
        return `
                <ul class="recipeList">
                    ${data.map(item => createItem(item)).join("")}
                </ul>
            `
    }

    function createItem(data) {
        return `
                <li class="listItem">
                    <h2>${data.title}</h2>
                    <img src="${data.thumbnail}" alt="tumbnail image of ${data.title}">
                    ${createIngredientsList(data.ingredients)}
                    <a href="${data.href}">Link to Recipe</a>
                </li>
            `
    }

    function createIngredientsList(data) {
        return `
            <ul class="IngredientsList">
                ${data
                .split(", ")
                .map(ingredient => {
                    return `
                        <li class="ingredientsItem">
                            ${ingredient}
                        </li>
                         `
                }).join("")
                }
            </ul>
            `
    }


    //level 2 start

    function createSearch(data) {
        return `
            <form id="searchBar">
                <input id="searchField" type="text" name="searchContent">
                <button id="searchBtn" type="submit">Search</button>
            </form>
            `
    }

    function search(search, data) {
        const newData = {
            ...data,
            results: data.results.filter(data => data.ingredients.includes(search))
        };
        console.log(newData);
        updateApp(newData)
    }

    function updateApp(data) {
        rootDOM.innerHTML = createPage(data);
        rootDOM.querySelector("#searchBar").addEventListener("submit", function (elem) {
            elem.preventDefault();
            search(rootDOM.querySelector("#searchField").value, originalData)
        })
    }
    updateApp(originalData);

}
