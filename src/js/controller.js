import "normalize.css";
import "../css/main.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

// API: https://forkify-api.jonas.io/
// Demo: https://forkify-v2.jonas.io/

///////////////////////////////////////

const searchButton = document.querySelector(".search-button");

const controlRecipes = async function (e) {
  e.preventDefault();
  // const searchValue = searchBar.value.toLowerCase();

  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchReuslts = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search reuslts
    await model.loadSearchResults(query);

    // Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const showRecipes = function (recipes) {
  recipes.forEach((recipe) => {
    const html = `
            <li>
              <a href="" class="result">
                <img src="${recipe.image_url}" alt="recipe" class="result-icon" />
                <div class="result-details">
                  <h4>${recipe.title}</h4>
                  <p>${recipe.publisher}</p>
                </div>
              </a>
            </li>
    `;
    console.log(recipe.image_url);
    recipesContainer.insertAdjacentHTML("beforeend", html);
  });
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchReuslts);
};
init();
