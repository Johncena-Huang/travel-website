import icons from "../../assets/sprite-collection.svg";
import defaultImg from "../../assets/main-sections/default-photo.png";
class DetailsView {
  _parentElement = "";
  _getNameByTheme = {
    ScenicSpot: "ScenicSpotName",
    Restaurant: "RestaurantName",
    Hotel: "HotelName",
    Activity: "ActivityName",
  };
  _getDescriptionByTheme = {
    ScenicSpot: "DescriptionDetail",
    Restaurant: "Description",
    Hotel: "Description",
    Activity: "Description",
  };
  _generateMarkup(data) {
    const name = this._getNameByTheme[data.theme];
    const description = this._getDescriptionByTheme[data.theme];
    return `
      <div class="details">
        <div class="details__heading">
          <svg class="svg prev-page-icon">
            <use xlink:href="${icons}#arrow-left"></use>
          </svg>
          <h2 class="heading-secondary mb-medium mr-auto">${
            data.details[0][name]
          }</h2>
          <svg class="svg printer-icon">
            <use xlink:href="${icons}#printer"></use>
          </svg>
          <svg class="svg share-icon">
            <use xlink:href="${icons}#share"></use>
          </svg>
        </div>
        <div class="details__banner">
          <image src=${
            data.details[0].Picture?.PictureUrl1 || defaultImg
          } alt="Banner">
        </div>
        <div class="details__info">
          <p class="details__address">${
            data.details[0].Address || data.details[0].City
          }</p>
          <p class="details__open-hours">${
            data.details[0].OpenTime || "暫無提供"
          }</p>
          <p class="details__phone-number">${data.details[0].Phone}</p>
        </div>
        <p class="details__intro">
          <span class="details__title">景點介紹</span>
          ${
            data.details[0][description].match(/。/g)?.length === 1
              ? data.details[0][description]
              : data.details[0][description].replaceAll("。", "。<br /><br />")
          }
        </p>
        <div class="details__transportation">
          <span class="details__title">交通</span>
          <iframe
            class="map"
            frameborder="0"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
            src="https://www.google.com/maps/embed/v1/place?key=${
              process.env.GOOGLE_API_KEY
            }&q=${data.details[0].Position.PositionLat}, ${
      data.details[0].Position.PositionLon
    }&zoom=16"
          >
          </iframe>
        </div>
      </div>
        `;
  }
}

export default new DetailsView();
