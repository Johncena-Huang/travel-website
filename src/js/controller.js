// import "core-js/stable";
// import "regenerator-runtime/runtime";
import "@babel/polyfill";
import "../sass/main.scss";
import searchView from "./views/searchView.js";
import mainView from "./views/mainView.js";
import * as model from "./model.js";
import { getDataFromHash } from "./helpers.js";
const controlOverallSearch = async function () {
  try {
    // getting query string from hash
    const { cityName, keyword, theme } = getDataFromHash();
    if (!cityName && !theme) return;
    // render loading spinner
    mainView.renderSpinner();
    // load search results
    await model.loadSearchResults(cityName, keyword, theme);
    // render search results
    mainView.renderSearchResults(model.state.search, true);
    // render read more button
    mainView.renderReadMoreBtn(model.isAllDataFetched);
  } catch (error) {
    // render error message
    mainView.renderError(error);
  }
};
const controlReturn = function () {
  // reset the details property on state object
  model.resetDetails();
};
const controlLoadMore = async function () {
  // getting query string from hash
  const { cityName, keyword, theme } = getDataFromHash();
  // load more dataw
  await model.loadMore(cityName, keyword, theme);
  // update the view
  mainView.renderMore(model.state.search);
  // update the button
  mainView.updateReadMoreBtn(model.isAllDataFetched);
};
const controlDetails = async function () {
  try {
    // grab the id query string from hash
    const { id } = getDataFromHash();
    if (!id) return;
    // load the spiiner
    mainView.renderSpinner();
    // load the details
    await model.loadDetails(id);
    // render the details
    mainView.renderDetails(model.state.search);
  } catch (error) {
    console.error(error);
  }
};
const mainInit = async function () {
  if (window.location.hash) return;
  mainView.renderBanner();
  await model.loadSearchResults("", "''", "ScenicSpot");
  mainView.renderCategory(model.state.search);
  await model.loadSearchResults("", "''", "Hotel");
  mainView.renderCategory(model.state.search);
  await model.loadSearchResults("", "''", "Restaurant");
  mainView.renderCategory(model.state.search);
  await model.loadSearchResults("", "''", "Activity");
  mainView.renderCategory(model.state.search);
};
const init = function () {
  searchView.addHandlerSearch(controlOverallSearch);
  mainView.addHandlerPrev(controlReturn);
  mainView.addHandlerRenderDetails(controlDetails);
  mainView.addHandlerLoadMore(controlLoadMore);
  mainView.addHandlerInit(mainInit);
};
init();
