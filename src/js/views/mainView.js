import View from "../views/View.js";

class MainView extends View {
  _parentElement = document.querySelector(".main-sections");
  constructor() {
    super();
    this._addHandlerPrint();
    this._addHandlerShare();
  }
  _addHandlerShare() {
    this._parentElement.addEventListener("click", (e) => {
      const isShareIcon = e.target.closest(".share-icon");
      if (!isShareIcon) return;
      if (!navigator.share)
        return alert("The browser doesn't support this feature!!");

      const textProp = `地點: ${
        this._data.details[0].City || this._data.details[0].Address.slice(0, 3)
      }
      開放時間: ${this._data.details[0].OpenTime}
      連絡電話: ${this._data.details[0].Phone}
      景點介紹: ${this._data.details[0].Description}
      ${
        this._data.details[0].Picture?.PictureUrl1
          ? "參考圖片:" + this._data.details[0].Picture.PictureUrl1
          : "目前無參考圖片"
      }
      `;
      navigator.share({
        title: "旅遊地點資訊",
        text: textProp,
      });
    });
  }
  _addHandlerPrint() {
    this._parentElement.addEventListener("click", (e) => {
      const isPrevBtn = e.target.closest(".printer-icon");
      if (!isPrevBtn) return;
      window.print();
    });
  }
  addHandlerPrev() {
    this._parentElement.addEventListener("click", (e) => {
      const isPrevBtn = e.target.classList.contains("prev-page-icon");
      if (!isPrevBtn) return;
      window.history.back();
    });
  }
  addHandlerLoadMore(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const isLoadBtn = e.target.closest(".load-button");
      if (!isLoadBtn) return;
      handler();
    });
  }

  _generateMarkupBanner() {
    return `
        <section class="banner">
          <h1 class="heading-primary">探索。<br />福爾摩沙</h1>
        </section>
        `;
  }
  // addImagesToDom() {
  //   const frames = document.querySelectorAll(".card__frame");
  //   frames.forEach((frame, index) => {
  //     if (frame.childElementCount < 2)
  //       frame.prepend(this._data.results[index].img);
  //   });
  // }
  addHandlerRenderDetails(handler) {
    ["load", "hashchange"].forEach((event) => {
      window.addEventListener(event, handler);
    });
  }
  addHandlerInit(handler) {
    ["load", "hashchange"].forEach((event) => {
      window.addEventListener(event, handler);
    });
  }
}
export default new MainView();

/*
(1.) create the image element and then load the src
(2.) once they are fully downloaded, add the markup to DOM
(3.) Add the downloaded images to DOM programmatically
*/

/* blob 
def: the binary representation of any type of data. The stored information is accessed by "URL" ranther than "path".
In short, blob URL is a pointer equivalent to the "path" of a file.
Usage: when a file is uploaded on the front end before sent to the back end, the file is stored somewhere. 
With blob, we can preview this file on the front end by getting its pointer(blob URL) which references its location in the memory.
*/
