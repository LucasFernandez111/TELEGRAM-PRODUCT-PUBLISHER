import Excel, { Column } from "exceljs";
import { DataSheet } from "../../interfaces/excel.interfaces";
import { generatedPath } from "../../config";
import path from "path";

export const createExcel = async (dataSheet: DataSheet) => {
  const { codes, urls, yupoo } = dataSheet;
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("My Sheet");

  const headers = ["CODE", "Aliexpress link", yupoo];
  headers.forEach((header, index) => {
    worksheet.getColumn(index + 1).header = header;
    styleColumn(worksheet.getColumn(index + 1), header);
  });
  // Configurar las columnas con sus datos correspondientes
  worksheet.getColumn(1).values = codes;
  worksheet.getColumn(2).values = urls;

  // Establecer y estilizar los encabezados de las columnas

  // Generar el nombre del archivo con la hora y minutos actuales
  const filePath = generateFileName();
  await workbook.xlsx.writeFile(filePath);
  return filePath;
};

function styleColumn(column: Column, header: string) {
  column.eachCell((cell) => {
    cell.style = {
      font: { color: { argb: "FFFFFFFF" }, bold: true },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000FF" },
      },
      alignment: { horizontal: "center" },
    };
  });
  column.width = header.length < 12 ? 12 : header.length;
}

function generateFileName() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const fileName = `${hours}-${minutes}.xlsx`;
  return path.join(generatedPath, fileName);
}
