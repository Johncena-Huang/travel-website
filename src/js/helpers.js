import { API_URI, RES_PER_CALL, QUERY_STRING, TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const getDataFromHash = function () {
  const cityName =
    window.location.hash.slice(1).match(/^[A-Z][A-Za-z]+(?=[&||%])?/)?.[0] ||
    "";
  const keyword = window.location.hash.slice(1).match(/(?<=&).*/)?.[0] || "''";
  const theme =
    window.location.hash.slice(1).match(/(?<=%)[A-Z][A-Za-z]+(?=&)?/)?.[0] ||
    "";
  const id = window.location.hash.slice(1).match(/^(C[1-4]_).*/)?.[0] || "";
  return { cityName, keyword, theme, id };
};

export const createURL = function (
  { city, keyword, theme },
  loadCount = 1,
  { method = "default" } = {}
) {
  switch (method) {
    case "default":
      return `${API_URI}${theme + "/"}${city}?%24filter=contains(${
        QUERY_STRING[theme]
      },${keyword})&%24top=${loadCount * RES_PER_CALL}&%24format=JSON`;
    case "idQuery":
      return `${API_URI}${theme + "/"}?%24filter=contains(${
        theme + "ID"
      },'${keyword}')&%24top=${loadCount * RES_PER_CALL}&%24format=JSON`;
  }
  // return `${API_URI}${city}?%24filter=contains(ScenicSpotName,${keyword})&%24top=${
  //   loadCount * RES_PER_CALL
  // }${skip ? "&%24skip=" + skip : ""}&%24format=JSON`;
};

const getAuthorizationHeader = function () {
  const AppID = process.env.API_ID;
  const AppKey = process.env.API_KEY;
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return {
    Authorization: Authorization,
    "X-Date": GMTString,
  };
};
export const AJAX = async function (url, loadCount, method) {
  try {
    const response = await Promise.race([
      fetch(url, { headers: getAuthorizationHeader() }),
      timeout(TIMEOUT_SEC),
    ]);
    if (!response.ok) throw new Error(`找不到關於此關鍵字的資料`);
    const rawData = await response.json();
    switch (method) {
      case "fetch":
        return rawData;
      case "add": {
        const first = RES_PER_CALL * (loadCount - 1);
        const last = RES_PER_CALL * loadCount;
        const data = rawData.slice(first, last);
        return data;
      }
      case "init": {
        const data = rawData.slice(0, 3);
        return data;
      }
    }
  } catch (error) {
    throw error;
  }
};

// https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?%24filter=contains(ScenicSpotName%2C%22%E8%8A%B1%22)&%24top=30&%24format=JSON
// https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/NewTaipei?%24filter=contains(ScenicSpotName,'%E8%8A%B1')&%24top=30&%24format=JSON
/* cross-origin request
Def: When the browser makes the request to the server on different origin
→ The origin header is added to the request message, it is a match if the reqeust message goes to the server on the same origin
When getting the response from the server, the browser will compare the origin header in request message to the access control allow origin
headerr in the response message to see if it is a match.
(1.) prefight request
def: the small request sent before the actual request such as options request
<note> easy fix → requested API to fix the problem to make it more cors policy friendly
*/
