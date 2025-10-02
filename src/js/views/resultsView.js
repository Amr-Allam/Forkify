import View from "./View.js";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".recipes-container");
  _errorMessage = "No recipes found for your query, Please try again!";
  _message = "";

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupResult).join("");
  }

  _generateMarkupResult(result) {
    return `
      <li>
        <a href="${result.id}" class="result">
          <img src="${result.image}" alt="${result.title}" class="result-icon" />
          <div class="result-details">
            <h4>${result.title}</h4>
            <p>${result.publisher}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new ResultsView();
