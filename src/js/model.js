import { AJAX, createURL } from "./helpers.js";
import { RES_PER_CALL, ID_THEME_CONVERTER } from "./config.js";
export let state = {
  search: {
    loadCount: 1,
    city: "",
    keyword: "",
    results: [],
    details: {},
  },
};

export const resetDetails = function () {
  state.search.details = {};
};
export const loadSearchResults = async function (city, keyword, theme) {
  // fetch the data from API
  const data = await AJAX(
    createURL({ city, keyword, theme }, state.search.loadCount),
    state.search.loadCount,
    "fetch"
  );
  // update state
  Object.assign(state.search, { results: data, keyword, city, theme });
  // state.search = { results: data, keyword, city };
};
const preloadImg = function (result, index) {
  return new Promise((resolve, reject) => {
    const pageCountConst = (state.search.loadCount - 1) * RES_PER_CALL;
    result.img = new Image();
    result.img.onload = resolve;
    result.img.onerror = reject;
    result.img.alt = `Photo ${pageCountConst + index + 1}`;
    result.img.classList.add("card__image");
    result.img.src =
      result.Picture?.PictureUrl1 || "assets/main-sections/default-photo.png";
  });
};
export const preloadImages = async function (results, add = true) {
  const first = add ? RES_PER_CALL * (state.search.loadCount - 1) : 0;
  const last = RES_PER_CALL * state.search.loadCount;
  return Promise.all(results.slice(first, last).map(preloadImg));
};
export const isAllDataFetched = function () {
  if (state.search.loadCount * RES_PER_CALL > state.search.results.length) {
    return true;
  }
  return false;
};
export const loadDetails = async function (id) {
  const theme = ID_THEME_CONVERTER[id.slice(0, 2)];
  const keyword = id;
  const city = "";
  const data = await AJAX(
    createURL({ city, keyword, theme }, state.search.loadCount, {
      method: "idQuery",
    }),
    state.search.loadCount,
    "fetch"
  );
  Object.assign(state.search, { theme, city, details: data });

  // const themeId = THEME_ID_CONVERTER[this.state.search.theme];
  // const found = state.search.results.find((element) => element[themeId] === id);
  // state.search.details = found;
};
export const loadMore = async function (city, keyword, theme) {
  const pageCount = ++state.search.loadCount;
  const data = await AJAX(
    createURL({ city, keyword, theme }, pageCount),
    pageCount,
    "add"
  );
  state.search.results.push(...data);
};
