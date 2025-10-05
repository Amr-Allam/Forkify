import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
      <li>
        <a href="#${this._data.id}" class="result ${
      this._data.id === id ? "result-active" : ""
    }">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="result-icon" />
          <div class="result-details">
            <h4>${this._data.title}</h4>
            <p>${this._data.publisher}</p>
          </div>
          <div class="recipe-user-icon ${this._data.key ? "" : "hidden"}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </a>
      </li>
    `;
  }
}

export default new PreviewView();
