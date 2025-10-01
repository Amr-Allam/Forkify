class SearchView {
  #parentElement = document.querySelector(".search-form");

  getQuery() {
    const query = this.#parentElement.querySelector(".search-bar").value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentElement.querySelector(".search-bar").value = "";
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
