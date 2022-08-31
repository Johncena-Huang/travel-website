class SearchView {
  _parentElement = document.querySelector(".navigation");
  _destination = this._parentElement.querySelector(".search-box__select");
  _checkbox = document.querySelector(".search-box__checkbox");
  _searchBar = document.querySelector(".search-box__keyword");
  _themeBox = document.querySelector(".search-box__theme-box");
  _themeItems = document.querySelectorAll(".search-box__theme-item");
  constructor() {
    this._addHandlerSelectCity();
    this._addHandlerRemoveCity();
    this.addHandlerSearchTheme();
    this._addHandlerToggleList();
  }
  _getCityName() {
    const cityName =
      document.querySelector(".search-box__select").dataset.city || "";
    return cityName;
  }
  _getKeyword() {
    const keyword =
      document.querySelector(".search-box__keyword").value || "''";
    return keyword;
  }
  _getTheme() {
    const theme =
      document.querySelector(".search-box__theme-item.selected").dataset
        .theme || "";
    return theme;
  }
  _selectCity(e) {
    // guard clause
    const isFromRadio = e.target.type === "radio";
    if (!isFromRadio) return;
    // update the text field
    const cityName = e.target.id;
    const cityEngName = e.target.value;
    // store the data to be sent as the data attribute on text field
    this._destination.textContent = cityName;
    this._destination.classList.add("selected");
    this._destination.dataset.city = cityEngName;
    this._checkbox.checked = false;
  }
  _RemoveSelectedCity(e) {
    const isSelected = e.target.classList.contains("selected");
    if (!isSelected) return;
    this._destination.classList.remove("selected");
    this._destination.dataset.city = "";
    this._destination.textContent = "選擇目的地";
  }
  _addHandlerSelectCity() {
    this._parentElement.addEventListener("click", this._selectCity.bind(this));
  }
  _addHandlerRemoveCity() {
    this._destination.addEventListener(
      "click",
      this._RemoveSelectedCity.bind(this)
    );
  }
  addHandlerSearchTheme() {
    this._themeBox.addEventListener("click", (e) => {
      const themeItem = e.target.closest(".search-box__theme-item");
      if (!themeItem) return;
      this._themeItems.forEach((theme) => theme.classList.remove("selected"));
      themeItem.classList.add("selected");
    });
  }
  _toggler() {
    const searchBox = this._parentElement.querySelector(".search-box");
    if (window.innerWidth < 1081) searchBox.classList.toggle("slide");
  }
  _addHandlerToggleList() {
    this._parentElement.addEventListener("click", (e) => {
      const isFromNavBtn = e.target.closest(".nav-button");
      if (!isFromNavBtn) return;
      this._toggler();
    });
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.hash.slice(1);
      const cityName = this._getCityName();
      const keyword = this._getKeyword();
      const theme = this._getTheme();
      location.hash = `${cityName}${theme ? "%" + theme : ""}${
        keyword === "''" ? "" : "&" + keyword
      }`;
      this._toggler();
      handler();
    });
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }
}

export default new SearchView();
