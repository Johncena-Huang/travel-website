// ResultsView = h4 + sort-box + gallery
import icons from "../../assets/sprite-collection.svg";
import CardView from "./cardView.js";

class ResultsView {
  generateMarkup(data) {
    const theme = data.theme;
    return `
          <h4 class="category__title">${
            data.keyword !== "''" ? data.keyword : data.city
          }</h4>
          <div class="sort-box">
            <svg class="sort-box__icon">
              <use xlink:href="${icons}#sort"></use>
            </svg>
            <input type="radio" id="all" value="all" name="sort" checked />
            <label for="all" class="sort-box__button">ε¨ι¨</label>
            <input
              type="radio"
              id="popularity"
              value="popularity"
              name="sort"
            />
            <label for="popularity" class="sort-box__button">π₯ η±ιη¨εΊ¦</label>
            <input
              type="radio"
              id="recommendation"
              value="recommendation"
              name="sort"
            />
            <label for="recommendation" class="sort-box__button">π ζ¨θ¦</label>
          </div>
          <div class="gallery">
          ${data.results.map(CardView.cardThemeRouter[theme]).join("")}
          </div>
        `;
  }
}

export default new ResultsView();
