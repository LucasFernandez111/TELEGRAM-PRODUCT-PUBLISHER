import { readDataExcel } from "../../services/excel/read.data.excel";
import { readExcelFile } from "../../services/excel/read.excel.file";

async function testExtractorData(path: string) {
  const workbook = await readExcelFile(path);

  return await readDataExcel(workbook);
}

testExtractorData(
  "C:/Users/Lucas/Desktop/TELEGRAM-BOT-ADMIN/src/test/excel/test.xlsx"
).then((res) => console.log(res));
