import "normalize.css";
import "../css/main.css";

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

const recipe = document.querySelector(".recipe");
const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-button");
const recipesContainer = document.querySelector(".recipes-container");

const getRecipe = async function (e) {
  e.preventDefault();
  const searchValue = searchBar.value.toLowerCase();

  try {
    const res = await fetch(
      // "https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886"
      `https://forkify-api.jonas.io/api/v2/recipes?search=${searchValue}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    console.log(res, data);

    const { recipes } = data.data;
    renderRecipes(recipes.slice(10));

    // let { recipe } = data.data;
    // console.log(recipe);
    // recipe = {
    //   id: recipe.id,
    //   title: recipe.title,
    //   publisher: recipe.publisher,
    //   sourceUrl: recipe.source_url,
    //   image: recipe.image_url,
    //   servings: recipe.servings,
    //   cookingTime: recipe.cooking_time,
    //   ingredients: recipe.ingredients,
    // };
    // console.log(recipe);
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

// parcel index.html --https false
