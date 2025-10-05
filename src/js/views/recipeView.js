import View from "./View.js";

import icons from "url:../../img/icons.svg";
import fracty from "fracty";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. Please try another one!";
  _message = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".update-servings-button");
      if (!btn) return;

      const updateTo = +btn.dataset.updateTo;
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".recipe-bookmark-button");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
          <button class="back-to-results">
            <svg class="recipe__info-icon">
                  <use href="${icons}#icon-arrow-left"></use>
            </svg>
            Back
          </button>
          <figure class="recipe-fig">
            <img
              src="${this._data.image}"
              alt="${this._data.title}"
              class="recipe-image"
            />
            <h1 class="recipe-title">
              <span>${this._data.title}</span>
            </h1>
          </figure>
          <div class="recipe-details">
            <div class="recipe-info">
              <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
              </svg>
              <span class="recipe-info-number">${this._data.cookingTime}</span
              ><span class="recipe-info-text">Minutes</span>
            </div>
            <div class="recipe-info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
              </svg>
              <span class="recipe-info-number">${this._data.servings}</span
              ><span class="recipe-info-text">Servings</span>
              <div class="servings-buttons-container">
                <button class="decrease-servings update-servings-button" data-update-to="${
                  this._data.servings - 1
                }">
                  <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="increase-servings update-servings-button" data-update-to="${
                  this._data.servings + 1
                }">
                  <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>
            <div class="recipe-user-icon ${this._data.key ? "" : "hidden"}">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
            <button class="recipe-bookmark-button">
              <svg>
                <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
              </svg>
            </button>
          </div>
          <div class="recipe-ingredients">
            <h2 class="ingredients-heading">Recipe Ingredients</h2>
            <ul class="recipe-ingredients-list">
            ${this._data.ingredients
              .map(this._generateMarkupIngredient)
              .join("")}
            </ul>
          </div>
          <div class="recipe-directions">
            <h2 class="ingredients-heading">How to cook it</h2>
            <p class="recipe-directions-text">
              This recipe was carefully designed and tested by
              <span>${
                this._data.publisher
              }</span>. Please check out directions at their
              website.
            </p>
            <a href="${this._data.sourceUrl}" class="recipe-directions-link"
              >Directions
              <svg >
                    <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
  `;
  }

  _generateMarkupIngredient(ing) {
    return `
      <li class="recipe-ingredient">
        <svg >
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="ingredient-quantity">${
          ing.quantity ? fracty(ing.quantity) : ""
        }</div>
        <div class="ingredient-description">${ing.unit} ${ing.description}</div>
      </li>
              `;
  }

  addHandlerBackButton(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".back-to-results");
      if (!btn) return;
      handler();
    });
  }
  hideRecipe() {
    this._parentElement.style.display = "none";
  }
  showRecipe() {
    this._parentElement.style.display = "block";
  }
}

export default new RecipeView();
