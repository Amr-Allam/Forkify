import View from "./View.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".recipes-container");
  _errorMessage = "No recipes found for your query, Please try again!";
  _message = "";

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }

  hideResults() {
    this._parentElement.parentElement.style.display = "none";
  }
  showResults() {
    window.location.hash = "";

    this._parentElement.parentElement.style.display = "block";

    const activeResult = this._parentElement.querySelector(".result-active");
    if (activeResult) activeResult.classList.remove("result-active");
  }
}

export default new ResultsView();
