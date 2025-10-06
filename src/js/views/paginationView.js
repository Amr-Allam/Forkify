import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination-button");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="pagination-button next-button">
          Page ${curPage + 1}
          <svg>
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
    `;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }"  class="pagination-button previous-button">
          <svg>
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          Page ${curPage - 1}
        </button>
    `;
    }
    // Other page
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="pagination-button previous-button">
          <svg>
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          Page ${curPage - 1}
        </button>
        <button data-goto="${
          curPage + 1
        }" class="pagination-button next-button">
          Page ${curPage + 1}
          <svg>
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Page 1, and NO other pages
    return "";
  }
}

export default new PaginationView();
