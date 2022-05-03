import icons from "../../assets/sprite-collection.svg";
import defaultImg from "../../assets/main-sections/default-photo.png";
class CardView {
  _checkOpenTime(time) {
    const openTime = time || "目前尚無開放時間資料";
    return openTime.length > 13 ? "請點擊查看詳情" : openTime;
  }
  cardThemeRouter = {
    ScenicSpot: this._generateMarkupScenicSpot.bind(this),
    Hotel: this._generateMarkupHotel.bind(this),
    Restaurant: this._generateMarkupRestaurant.bind(this),
    Activity: this._generateMarkupActivity.bind(this),
  };
  _generateMarkupScenicSpot(result) {
    return `
        <a class="card" href="#${result.ScenicSpotID}">
          <div class="card__frame">
            <img class="card__image" src=${
              result.Picture.PictureUrl1 || defaultImg
            }>
            <div class="card__share-container">
                <svg>
                  <use xlink:href="${icons}#share">
                  </use>
                </svg>
            </div>
            </div>
          <div class="card__body">
            <h4 class="heading-quaternary mb-small">${
              result.ScenicSpotName
            }</h4>
            <div class="card__info-box">
                <div class="card__info">
                    <svg>
                    <use xlink:href="${icons}#location">
                    </use>
                    </svg>
                <p class="card__text">${
                  result.City || result.Address?.slice(0, 3) || "目前並無資料"
                }</p>
                </div>
                <div class="card__info">
                <svg>
                    <use xlink:href="${icons}#clock">
                    </use>
                </svg>
                <p class="card__text">${this._checkOpenTime(
                  result.OpenTime
                )}</p>
                </div>
            </div>
            </div>
        </a>
        `;
  }

  _generateMarkupHotel(result) {
    return `
        <a class="card card--secondary" href="#${result.HotelID}">
          <div class="card__frame">
            <img class="card__image" src=${
              result.Picture.PictureUrl1 || defaultImg
            }>
            <div class="card__share-container">
              <svg class="svg-share">
                <use xlink:href="${icons}#share">
                </use>
              </svg>
            </div>
          </div>
          <div class="card__body">
            <h4 class="heading-quaternary mb-small">${result.HotelName}</h4>
            <div class="card__info-box">
              <div class="card__info">
                  <svg>
                    <use xlink:href="${icons}#phone">
                    </use>
                  </svg>
                <p class="card__text">${result.Phone}</p>
              </div>
              <div class="card__info">
                <svg>
                  <use xlink:href="${icons}#location">
                  </use>
                </svg>
                <p class="card__text">${result.Address}</p>
              </div>
            </div>
          </div>
        </a>
        `;
  }
  _generateMarkupRestaurant(result) {
    return `
        <a class="card card--secondary" href="#${result.RestaurantID}">
          <div class="card__frame">
            <img class="card__image" src=${
              result.Picture.PictureUrl1 || defaultImg
            }>
            <div class="card__share-container">
              <svg class="svg-share">
                <use xlink:href="${icons}#share">
                </use>
              </svg>
            </div>
          </div>
          <div class="card__body">
            <h4 class="heading-quaternary mb-small">${
              result.RestaurantName
            }</h4>
            <div class="card__info-box">
              <div class="card__info">
                  <svg>
                    <use xlink:href="${icons}#phone">
                    </use>
                  </svg>
                <p class="card__text">${result.Phone}</p>
              </div>
              <div class="card__info">
                <svg>
                  <use xlink:href="${icons}#location">
                  </use>
                </svg>
                <p class="card__text">${result.Address}</p>
              </div>
            </div>
          </div>
        </a>
        `;
  }
  _generateMarkupActivity(result) {
    return `
        <a class="card card--secondary" href="#${result.ActivityID}">
          <div class="card__frame">
            <img class="card__image" src=${
              result.Picture.PictureUrl1 || defaultImg
            }>
            <div class="card__share-container">
              <svg class="svg-share">
                <use xlink:href="${icons}#share">
                </use>
              </svg>
            </div>
          </div>
          <div class="card__body">
            <h4 class="heading-quaternary mb-small">${result.ActivityName}</h4>
            <div class="card__info-box">
              <div class="card__info">
                  <svg>
                    <use xlink:href="${icons}#phone">
                    </use>
                  </svg>
                <p class="card__text">${result.Phone || "暫無提供"}</p>
              </div>
              <div class="card__info">
                <svg>
                  <use xlink:href="${icons}#location">
                  </use>
                </svg>
                <p class="card__text">${result.Address}</p>
              </div>
            </div>
          </div>
        </a>
        `;
  }
}
export default new CardView();
