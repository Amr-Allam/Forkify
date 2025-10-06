import View from "./View.js";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload-form");
  _message = "Recipe was successfully uploaded!";

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".add-recipe-button");
  _btnClose = document.querySelector(".close-modal-button");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  renderForm(second) {
    setTimeout(() => {
      this._clear();
      this._parentElement.insertAdjacentHTML(
        "afterbegin",
        this._generateFormMarkup()
      );
    }, second * 1000);
  }

  _generateFormMarkup() {
    return `
          <div class="upload-column">
            <h3 class="upload-heading">Recipe Data</h3>
            <label>Title</label>
            <input type="text" name="title" required />
            <label>URL</label>
            <input type="text" name="sourceURL" required />
            <label>Image URL</label>
            <input type="text" name="image" required />
            <label>Publisher</label>
            <input type="text" name="publisher" required />
            <label>Prep time</label>
            <input type="text" name="cookingTime" required />
            <label>Servings</label>
            <input type="text" name="servings" required />
          </div>
          <div class="upload-column">
            <h3 class="upload-heading">Ingredients</h3>
            <label>Ingredient 1</label>
            <input
              type="text"
              name="ingredient-1"
              placeholder="Format: 'Quantity, Unit, Description"
            />
            <label>Ingredient 2</label>
            <input
              type="text"
              name="ingredient-2"
              placeholder="Format: 'Quantity, Unit, Description"
            />
            <label>Ingredient 3</label>
            <input
              type="text"
              name="ingredient-3"
              placeholder="Format: 'Quantity, Unit, Description"
            />
            <label>Ingredient 4</label>
            <input
              type="text"
              name="ingredient-4"
              placeholder="Format: 'Quantity, Unit, Description"
            />
            <label>Ingredient 5</label>
            <input
              type="text"
              name="ingredient-5"
              placeholder="Format: 'Quantity, Unit, Description"
            />
            <label>Ingredient 6</label>
            <input
              type="text"
              name="ingredient-6"
              placeholder="Format: 'Quantity, Unit, Description"
            />
          </div>
          <button class="upload-button">
            <svg>
              <use href="${icons}#icon-upload-cloud"></use>
            </svg>
            Upload
          </button>
          `;
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
