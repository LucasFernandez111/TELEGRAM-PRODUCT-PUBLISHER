import { DataSheet } from "../../interfaces/excel.interfaces";

export const getFirstFiveElements = (dataSheet: DataSheet) => {
  if (!dataSheet?.codes || !dataSheet?.urls) {
    throw new Error("Invalid dataSheet: codes or urls are undefined");
  }

  const firstFiveCodes = dataSheet.codes.slice(0, 5);
  const firstFiveUrls = dataSheet.urls.slice(0, 5);

  return {
    codes: firstFiveCodes,
    urls: firstFiveUrls,
    yupoo: dataSheet.yupoo,
  };
};

export const getRemainingElements = (dataSheet: DataSheet) => {
  if (!dataSheet?.codes || !dataSheet?.urls) {
    throw new Error("Invalid dataSheet: codes or urls are undefined");
  }

  const remainingCodes = dataSheet.codes.slice(5);
  const remainingUrls = dataSheet.urls.slice(5);

  return {
    codes: remainingCodes,
    urls: remainingUrls,
    yupoo: dataSheet.yupoo,
  };
};
