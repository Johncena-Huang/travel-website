// https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/ChanghuaCounty?%24filter=contains(ScenicSpotName%2C'%E8%8A%B1')&%24format=JSON

// 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/ChanghuaCounty?%24top=30&%24format=JSON'
export const RES_PER_CALL = 30;
export const TIMEOUT_SEC = 10;
export const API_URI = "https://ptx.transportdata.tw/MOTC/v2/Tourism/";
export const QUERY_STRING = {
  Restaurant: "RestaurantName",
  ScenicSpot: "ScenicSpotName",
  Hotel: "HotelName",
  Activity: "ActivityName",
};
export const ID_THEME_CONVERTER = {
  // ScenicSpot C1
  // Restaurant C3
  // Hotel C4
  // Activity C2
  C1: "ScenicSpot",
  C2: "Activity",
  C3: "Restaurant",
  C4: "Hotel",
};
export const THEME_ID_CONVERTER = {
  Restaurant: "RestaurantID",
  ScenicSpot: "ScenicSpotID",
  Hotel: "HotelID",
  Activity: "ActivityID",
};
//API_URI

/*
(1.) Restaurant → RestaurantName
(2.) ScenicSpot → ScenicSpotName
(3.) Hotel → HotelName
(4.) Activity → ActivityName
*/
