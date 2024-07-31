import { DataSheet } from "../../interfaces/excel.interfaces";

export const isDataComplete = (data: DataSheet): boolean => {
  return Boolean(
    data &&
      data.codes &&
      data.urls &&
      data.yupoo &&
      data.codes.length === data.urls.length
  );
};
