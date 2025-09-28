import "normalize.css";
import "../css/main.css";
import icons from "url:../img/icons.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";

// API: https://forkify-api.jonas.io/
// Demo: https://forkify-v2.jonas.io/

///////////////////////////////////////

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const recipeContainer = document.querySelector(".recipe");
const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-button");
const recipesContainer = document.querySelector(".recipes-container");

const getRecipe = async function (e) {
  e.preventDefault();
  const searchValue = searchBar.value.toLowerCase();

  try {
    renderSpinner(recipeContainer);
    const res = await fetch(
      "https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886"
      // `https://forkify-api.jonas.io/api/v2/recipes?search=${searchValue}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    console.log(res, data);

    // const { recipes } = data.data;
    // renderRecipes(recipes.slice(10));

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);
    renderRecipe(recipe);
  } catch (err) {
    alert(err);
  }
};

searchButton.addEventListener("click", getRecipe);

const renderRecipes = function (recipes) {
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

const renderSpinner = function (parentElement) {
  const html = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;

  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("afterbegin", html);
};

const renderRecipe = function (recipe) {
  const html = `
          <figure class="recipe-fig">
            <img
              src="${recipe.image}"
              alt="${recipe.title}"
              class="recipe-image"
            />
            <h1 class="recipe-title">
              <span>${recipe.title}</span>
            </h1>
          </figure>
          <div class="recipe-details">
            <div class="recipe-info">
              <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
              </svg>
              <span class="recipe-info-number">${recipe.cookingTime}</span
              ><span class="recipe-info-text">Minutes</span>
            </div>
            <div class="recipe-info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
              </svg>
              <span class="recipe-info-number">${recipe.servings}</span
              ><span class="recipe-info-text">Servings</span>
              <div class="servings-buttons-container">
                <button class="decrease-serving">
                  <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="increase-serving">
                  <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>
            <button class="recipe-user-button">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </button>
            <button class="recipe-bookmark-button">
              <svg>
                <use href="${icons}#icon-bookmark"></use>
              </svg>
            </button>
          </div>
          <div class="recipe-ingredients">
            <h2 class="ingredients-heading">Recipe Ingredients</h2>
            <ul class="recipe-ingredients-list">
            ${recipe.ingredients
              .map((ing) => {
                return `
                <li class="recipe-ingredient">
                  <svg >
                    <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="ingredient-quantity">${ing.quantity}</div>
                  <div class="ingredient-description">${ing.unit} ${ing.description}</div>
                </li>
              `;
              })
              .join("")}
            </ul>
          </div>
          <div class="recipe-directions">
            <h2 class="ingredients-heading">How to cook it</h2>
            <p class="recipe-directions-text">
              This recipe was carefully designed and tested by
              <span>${
                recipe.publisher
              }</span>. Please check out directions at their
              website.
            </p>
            <a href="${recipe.sourceUrl}" class="recipe-directions-link"
              >Directions
              <svg >
                    <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
  `;

  recipeContainer.innerHTML = "";
  recipeContainer.insertAdjacentHTML("afterbegin", html);
};
