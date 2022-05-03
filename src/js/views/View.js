import ResultsView from "./resultsView.js";
import CategoryView from "./categoryView.js";
import detailsView from "./detailsView.js";
import spinner from "../../assets/main-sections/Ripple-1.5s-300px.svg";
export default class View {
  _data;
  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderError(message = this._errorMessage) {
    const markup = `  
    <div class="error">
      <h2 class="heading-secondary">${message}</h2>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderSearchResults(data) {
    const markup = ResultsView.generateMarkup(data);
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderBanner() {
    const markup = this._generateMarkupBanner();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderCategory(data) {
    const markup = CategoryView.generateMarkup(data);
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }
  renderDetails(data) {
    // loading data
    this._data = data;
    // generate markup
    const markup = detailsView._generateMarkup(this._data);
    // clear canvas
    this._clear();
    // add to the DOM
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderSpinner() {
    const markup = `
        <div class="spinner">
            <img src=${spinner} alt="spinner">
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderMore(data) {
    // grab the gallery from real DOM
    const gallery = this._parentElement.querySelector(".gallery");
    // grab all the cards in DOM
    const currentCards = Array.from(
      this._parentElement.querySelectorAll(".card")
    );
    // generate markup for virtual DOM
    const newMarkup = ResultsView.generateMarkup(data);
    // add the markup to virtual DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // grab all the cards from virtual DOM
    const newCards = Array.from(newDOM.querySelectorAll(".card"));
    // add the new cards from virtual DOM to real DOM
    newCards.forEach((newCard, index) => {
      const currentCard = currentCards[index];
      if (!currentCard) {
        gallery.append(newCard);
      }
    });
    // this.addImagesToDom();
  }
  renderReadMoreBtn(isDataAllFetched) {
    const markup = `
      <button class="load-button">載入更多</button>
    `;
    if (!isDataAllFetched()) {
      this._parentElement.insertAdjacentHTML("beforeend", markup);
    }
    return;
  }
  updateReadMoreBtn(isDataAllFetched) {
    if (isDataAllFetched())
      return this._parentElement.querySelector(".load-button").remove();
  }
}
