import { generatedPath } from "../../config";
import { createExcel } from "../../services/excel/create.excel";
import { readDataExcel } from "../../services/excel/read.data.excel";
import { readExcelFile } from "../../services/excel/read.excel.file";
import { Worksheet } from "exceljs";
import Excel, { Workbook } from "exceljs";
import { extractPlainText } from "../../services/excel/richtext";

async function testExtractorData(path: string) {
  const workbook = await readExcelFile(path);

  return await readDataExcel(workbook);
}

// testExtractorData(
//   "C:/Users/Lucas/Desktop/TELEGRAM-BOT-ADMIN/src/test/excel/test.xlsx"
// ).then((res) => console.log(res));

// createExcel({
//   codes: ["123456789", "123456789"],
//   urls: ["https://www.aliexpress.com", "https://www.aliexpress.com"],
//   yupoo: "https://www.yupoo.com",
// });

console.log(extractPlainText("ghghghghhttps://zxd1688.x.yupoo.com/"));
