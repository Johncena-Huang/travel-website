// categoryView = category + gallery;
import CardView from "./cardView.js";
import icons from "../../assets/sprite-collection.svg";
class CategoryView {
  _getCategoryNameByTheme = {
    Restaurant: "美食品嘗",
    ScenicSpot: "熱門景點",
    Hotel: "住宿推薦",
    Activity: "觀光活動",
  };
  generateMarkup(data) {
    const theme = data.theme;
    const categoryName = this._getCategoryNameByTheme[theme];
    return `
       <section class="category">
        <div class="category__text-box">
            <div class="category__title-icon">
            <svg>
                <use
                xlink:href="${icons}#location-purple"
                ></use>
            </svg>
            </div>
            <h3 class="heading-tertiary">${categoryName}</h3>
            <a href="#%${theme}" class="category__more">${categoryName}</a>
        </div>
        <div class="gallery">
          ${data.results
            .slice(0, 3)
            .map(CardView.cardThemeRouter[theme])
            .join("")}
        </div>
       </section>
        `;
  }
}

export default new CategoryView();
